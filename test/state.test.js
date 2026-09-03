import test from "node:test";
import assert from "node:assert/strict";
import { applySavedStatuses, filterAndSortIncidents, saveStatus } from "../src/state.js";

const incidents = [
  {
    id: "INC-1",
    title: "Checkout outage",
    severity: "Critical",
    owner: "Maya",
    status: "Investigating",
    opened: "2026-08-31T10:00:00Z",
    summary: "Payments failing"
  },
  {
    id: "INC-2",
    title: "Dashboard copy bug",
    severity: "Low",
    owner: "Liam",
    status: "Resolved",
    opened: "2026-08-30T10:00:00Z",
    summary: "Text wraps poorly"
  },
  {
    id: "INC-3",
    title: "Webhook retries delayed",
    severity: "High",
    owner: "Priya",
    status: "Monitoring",
    opened: "2026-08-29T10:00:00Z",
    summary: "CRM integration slow"
  }
];

test("filters by query and status, then sorts by severity", () => {
  const result = filterAndSortIncidents(incidents, {
    query: "o",
    severity: "All",
    status: "All",
    sort: "severity"
  });

  assert.deepEqual(result.map((incident) => incident.id), ["INC-1", "INC-3", "INC-2"]);
});

test("status updates persist through storage and can be reapplied after refresh", () => {
  const storage = new MemoryStorage();
  saveStatus("INC-1", "Resolved", storage);

  const refreshed = applySavedStatuses(incidents, JSON.parse(storage.getItem("incidentDesk.statusOverrides")));

  assert.equal(refreshed[0].status, "Resolved");
});

class MemoryStorage {
  constructor() {
    this.items = new Map();
  }

  getItem(key) {
    return this.items.get(key) || null;
  }

  setItem(key, value) {
    this.items.set(key, value);
  }
}
