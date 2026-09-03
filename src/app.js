import { baseIncidents, loadIncidents } from "./incidents.js";
import {
  SEVERITIES,
  STATUSES,
  applySavedStatuses,
  filterAndSortIncidents,
  getSavedStatuses,
  saveStatus,
  selectedIncidentIdFromUrl,
  setSelectedIncidentUrl
} from "./state.js";

const app = document.querySelector("#app");

const state = {
  incidents: [],
  loading: true,
  error: "",
  controls: {
    query: "",
    severity: "All",
    status: "All",
    sort: "opened"
  },
  selectedId: selectedIncidentIdFromUrl(window.location.search),
  notice: "",
  failNextLoad: false
};

init();

function init() {
  render();
  fetchIncidents();
  window.addEventListener("popstate", () => {
    state.selectedId = selectedIncidentIdFromUrl(window.location.search);
    render();
  });
}

async function fetchIncidents() {
  state.loading = true;
  state.error = "";
  render();

  try {
    const loaded = await loadIncidents({ shouldFail: state.failNextLoad });
    state.incidents = applySavedStatuses(loaded, getSavedStatuses());
    state.failNextLoad = false;
    state.loading = false;
    if (!state.selectedId && state.incidents.length) {
      selectIncident(state.incidents[0].id, { silent: true });
    }
    render();
  } catch (error) {
    state.loading = false;
    state.error = error.message;
    state.failNextLoad = false;
    render();
  }
}

function render() {
  const visible = filterAndSortIncidents(state.incidents, state.controls);
  const selected = state.incidents.find((incident) => incident.id === state.selectedId) || visible[0] || null;

  app.innerHTML = `
    <header class="topbar">
      <div>
        <p class="eyebrow">Operations</p>
        <h1>Incident Desk</h1>
      </div>
      <div class="summary-strip" aria-label="Incident summary">
        ${summaryMetric("Open", state.incidents.filter((i) => i.status !== "Resolved").length)}
        ${summaryMetric("Critical", state.incidents.filter((i) => i.severity === "Critical").length)}
        ${summaryMetric("Resolved", state.incidents.filter((i) => i.status === "Resolved").length)}
      </div>
    </header>

    <main class="workspace">
      <section class="desk-panel list-panel" aria-labelledby="incident-list-title">
        <div class="panel-heading">
          <div>
            <h2 id="incident-list-title">Incidents</h2>
            <p>${visible.length} of ${state.incidents.length || baseIncidents.length} records</p>
          </div>
          <button class="icon-button" data-action="simulate-error" type="button" title="Simulate load failure" aria-label="Simulate load failure">
            !
          </button>
        </div>
        ${controlsTemplate()}
        ${listContentTemplate(visible)}
      </section>

      <section class="desk-panel detail-panel" aria-labelledby="incident-detail-title">
        ${detailTemplate(selected)}
      </section>
    </main>
    <div class="toast ${state.notice ? "is-visible" : ""}" role="status" aria-live="polite">${escapeHtml(state.notice)}</div>
  `;

  bindEvents();
}

function summaryMetric(label, value) {
  return `<div><strong>${value}</strong><span>${label}</span></div>`;
}

function controlsTemplate() {
  return `
    <form class="controls" role="search" aria-label="Incident filters">
      <label>
        <span>Search</span>
        <input type="search" name="query" value="${escapeHtml(state.controls.query)}" placeholder="ID, owner, title" autocomplete="off">
      </label>
      <label>
        <span>Severity</span>
        <select name="severity">
          ${optionTemplate(["All", ...SEVERITIES], state.controls.severity)}
        </select>
      </label>
      <label>
        <span>Status</span>
        <select name="status">
          ${optionTemplate(["All", ...STATUSES], state.controls.status)}
        </select>
      </label>
      <label>
        <span>Sort</span>
        <select name="sort">
          ${optionTemplate([
            ["opened", "Newest"],
            ["severity", "Severity"],
            ["status", "Status"],
            ["owner", "Owner"]
          ], state.controls.sort)}
        </select>
      </label>
    </form>
  `;
}

function listContentTemplate(visible) {
  if (state.loading) {
    return `
      <div class="skeleton-list" aria-label="Loading incidents">
        ${Array.from({ length: 7 }, () => `<div class="skeleton-row"></div>`).join("")}
      </div>
    `;
  }

  if (state.error) {
    return `
      <div class="state-box error-state">
        <h3>Incidents did not load</h3>
        <p>${escapeHtml(state.error)}</p>
        <button type="button" data-action="retry">Retry</button>
      </div>
    `;
  }

  if (!visible.length) {
    return `
      <div class="state-box">
        <h3>No matching incidents</h3>
        <p>Adjust search or filters to widen the list.</p>
        <button type="button" data-action="clear-filters">Clear filters</button>
      </div>
    `;
  }

  return `
    <ol class="incident-list" aria-label="Incident results">
      ${visible.map((incident) => incidentRowTemplate(incident)).join("")}
    </ol>
  `;
}

function incidentRowTemplate(incident) {
  const selected = incident.id === state.selectedId;
  return `
    <li>
      <button class="incident-row ${selected ? "is-selected" : ""}" type="button" data-action="select" data-id="${incident.id}" aria-current="${selected ? "true" : "false"}">
        <span class="row-main">
          <span class="row-title">${escapeHtml(incident.title)}</span>
          <span class="row-meta">${incident.id} · ${escapeHtml(incident.owner)} · ${formatDate(incident.opened)}</span>
        </span>
        <span class="row-badges">
          <span class="badge severity-${incident.severity.toLowerCase()}">${incident.severity}</span>
          <span class="badge status">${incident.status}</span>
        </span>
      </button>
    </li>
  `;
}

function detailTemplate(incident) {
  if (state.loading) {
    return `
      <div class="detail-empty">
        <span class="spinner" aria-hidden="true"></span>
        <h2 id="incident-detail-title">Loading details</h2>
      </div>
    `;
  }

  if (!incident) {
    return `
      <div class="detail-empty">
        <h2 id="incident-detail-title">Select an incident</h2>
        <p>Choose a record from the list to inspect details.</p>
      </div>
    `;
  }

  return `
    <article class="detail-card">
      <div class="detail-header">
        <div>
          <p class="eyebrow">${incident.id}</p>
          <h2 id="incident-detail-title">${escapeHtml(incident.title)}</h2>
        </div>
        <span class="badge severity-${incident.severity.toLowerCase()}">${incident.severity}</span>
      </div>
      <dl class="detail-grid">
        <div><dt>Owner</dt><dd>${escapeHtml(incident.owner)}</dd></div>
        <div><dt>Status</dt><dd>${escapeHtml(incident.status)}</dd></div>
        <div><dt>Opened</dt><dd>${formatFullDate(incident.opened)}</dd></div>
      </dl>
      <section class="summary-block" aria-label="Incident summary">
        <h3>Summary</h3>
        <p>${escapeHtml(incident.summary)}</p>
      </section>
      <form class="status-form">
        <label for="status-update">Update status</label>
        <div class="status-actions">
          <select id="status-update" name="status-update">
            ${optionTemplate(STATUSES, incident.status)}
          </select>
          <button type="submit">Save</button>
        </div>
      </form>
    </article>
  `;
}

function bindEvents() {
  app.querySelector(".controls")?.addEventListener("input", (event) => {
    const form = event.currentTarget;
    state.controls = {
      query: form.elements.query.value,
      severity: form.elements.severity.value,
      status: form.elements.status.value,
      sort: form.elements.sort.value
    };
    render();
  });

  app.querySelectorAll("[data-action='select']").forEach((button) => {
    button.addEventListener("click", () => selectIncident(button.dataset.id));
  });

  app.querySelector("[data-action='retry']")?.addEventListener("click", fetchIncidents);
  app.querySelector("[data-action='clear-filters']")?.addEventListener("click", () => {
    state.controls = { query: "", severity: "All", status: "All", sort: "opened" };
    render();
  });
  app.querySelector("[data-action='simulate-error']")?.addEventListener("click", () => {
    state.failNextLoad = true;
    fetchIncidents();
  });
  app.querySelector(".status-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = state.incidents.find((incident) => incident.id === state.selectedId);
    if (!selected) return;
    const nextStatus = event.currentTarget.elements["status-update"].value;
    saveStatus(selected.id, nextStatus);
    selected.status = nextStatus;
    state.notice = `${selected.id} status saved`;
    render();
    window.setTimeout(() => {
      state.notice = "";
      render();
    }, 2200);
  });
}

function selectIncident(id, options = {}) {
  state.selectedId = id;
  setSelectedIncidentUrl(id);
  if (!options.silent) render();
}

function optionTemplate(options, selected) {
  return options
    .map((option) => {
      const value = Array.isArray(option) ? option[0] : option;
      const label = Array.isArray(option) ? option[1] : option;
      return `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

function formatFullDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}
