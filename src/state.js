export const STATUSES = ["Investigating", "Identified", "Monitoring", "Resolved"];
export const SEVERITIES = ["Critical", "High", "Medium", "Low"];

const severityRank = { Critical: 4, High: 3, Medium: 2, Low: 1 };
const statusRank = { Investigating: 4, Identified: 3, Monitoring: 2, Resolved: 1 };

export function getSavedStatuses(storage = globalThis.localStorage) {
  try {
    return JSON.parse(storage.getItem("incidentDesk.statusOverrides") || "{}");
  } catch {
    return {};
  }
}

export function saveStatus(id, status, storage = globalThis.localStorage) {
  const current = getSavedStatuses(storage);
  current[id] = status;
  storage.setItem("incidentDesk.statusOverrides", JSON.stringify(current));
  return current;
}

export function applySavedStatuses(incidents, savedStatuses) {
  return incidents.map((incident) => ({
    ...incident,
    status: savedStatuses[incident.id] || incident.status
  }));
}

export function filterAndSortIncidents(incidents, controls) {
  const query = controls.query.trim().toLowerCase();
  const filtered = incidents.filter((incident) => {
    const haystack = `${incident.id} ${incident.title} ${incident.owner} ${incident.status} ${incident.severity} ${incident.summary}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesSeverity = controls.severity === "All" || incident.severity === controls.severity;
    const matchesStatus = controls.status === "All" || incident.status === controls.status;
    return matchesQuery && matchesSeverity && matchesStatus;
  });

  return filtered.sort((a, b) => {
    if (controls.sort === "severity") return severityRank[b.severity] - severityRank[a.severity] || newestFirst(a, b);
    if (controls.sort === "status") return statusRank[b.status] - statusRank[a.status] || newestFirst(a, b);
    if (controls.sort === "owner") return a.owner.localeCompare(b.owner) || newestFirst(a, b);
    return newestFirst(a, b);
  });
}

export function selectedIncidentIdFromUrl(search) {
  return new URLSearchParams(search).get("incident");
}

export function setSelectedIncidentUrl(id, history = globalThis.history, location = globalThis.location) {
  const params = new URLSearchParams(location.search);
  if (id) params.set("incident", id);
  else params.delete("incident");
  const query = params.toString();
  history.replaceState({}, "", `${location.pathname}${query ? `?${query}` : ""}`);
}

function newestFirst(a, b) {
  return new Date(b.opened).getTime() - new Date(a.opened).getTime();
}
