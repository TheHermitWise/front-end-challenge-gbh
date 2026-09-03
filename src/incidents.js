export const baseIncidents = [
  {
    id: "INC-2401",
    title: "Checkout authorization failures",
    severity: "Critical",
    owner: "Maya Chen",
    status: "Investigating",
    opened: "2026-08-31T14:22:00Z",
    summary: "Card authorization requests are timing out for a portion of US checkout traffic after the payment gateway release."
  },
  {
    id: "INC-2402",
    title: "Search index lag above target",
    severity: "High",
    owner: "Owen Patel",
    status: "Monitoring",
    opened: "2026-08-30T09:10:00Z",
    summary: "Catalog updates are taking up to 38 minutes to appear in search results during peak ingestion windows."
  },
  {
    id: "INC-2403",
    title: "Mobile push notification duplication",
    severity: "Medium",
    owner: "Sofia Alvarez",
    status: "Identified",
    opened: "2026-08-29T18:42:00Z",
    summary: "Customers on Android receive duplicate shipment notifications when subscriptions renew within the same hour."
  },
  {
    id: "INC-2404",
    title: "Admin export job stuck",
    severity: "High",
    owner: "Liam Brooks",
    status: "Investigating",
    opened: "2026-08-28T12:05:00Z",
    summary: "Large CSV exports remain queued after the worker pool scaled down unexpectedly in the EU region."
  },
  {
    id: "INC-2405",
    title: "Invoice PDF rendering mismatch",
    severity: "Low",
    owner: "Nora Singh",
    status: "Resolved",
    opened: "2026-08-27T16:35:00Z",
    summary: "Long billing addresses overlap tax lines on invoices generated from the partner billing workflow."
  },
  {
    id: "INC-2406",
    title: "Password reset emails delayed",
    severity: "Medium",
    owner: "Ethan Wright",
    status: "Monitoring",
    opened: "2026-08-26T07:48:00Z",
    summary: "Transactional email provider queues intermittently delay password reset messages by more than ten minutes."
  },
  {
    id: "INC-2407",
    title: "Feature flag sync drift",
    severity: "Medium",
    owner: "Priya Raman",
    status: "Identified",
    opened: "2026-08-25T21:18:00Z",
    summary: "A subset of edge nodes serves stale feature flag values after regional network packet loss."
  },
  {
    id: "INC-2408",
    title: "Support inbox webhook failures",
    severity: "High",
    owner: "Jon Bell",
    status: "Investigating",
    opened: "2026-08-24T10:27:00Z",
    summary: "Inbound support messages fail to attach order context when the CRM webhook returns a 429 response."
  },
  {
    id: "INC-2409",
    title: "Dashboard revenue tile blank",
    severity: "Low",
    owner: "Amara Okafor",
    status: "Resolved",
    opened: "2026-08-23T13:55:00Z",
    summary: "Finance dashboard revenue tiles render blank if the selected account has no refunds in the current period."
  },
  {
    id: "INC-2410",
    title: "Warehouse label printer backlog",
    severity: "Critical",
    owner: "Mateo Ruiz",
    status: "Monitoring",
    opened: "2026-08-22T05:14:00Z",
    summary: "Shipping labels are delayed for two fulfillment centers because the print queue retry policy is too aggressive."
  },
  {
    id: "INC-2411",
    title: "Account switcher stale session",
    severity: "Medium",
    owner: "Grace Kim",
    status: "Resolved",
    opened: "2026-08-21T19:31:00Z",
    summary: "Users with multiple workspaces occasionally see the prior workspace name after switching accounts."
  },
  {
    id: "INC-2412",
    title: "Inventory reservation overcount",
    severity: "High",
    owner: "Caleb Stone",
    status: "Identified",
    opened: "2026-08-20T11:06:00Z",
    summary: "Bundles reserve component inventory twice when customers edit quantity from the cart drawer."
  },
  {
    id: "INC-2413",
    title: "Image CDN cache miss spike",
    severity: "Medium",
    owner: "Hannah Lee",
    status: "Monitoring",
    opened: "2026-08-19T08:50:00Z",
    summary: "Product image cache misses increased after a format negotiation rule was deployed to the CDN."
  },
  {
    id: "INC-2414",
    title: "Tax estimate service timeout",
    severity: "Critical",
    owner: "Noah Grant",
    status: "Investigating",
    opened: "2026-08-18T15:44:00Z",
    summary: "Tax estimates time out for Canadian postal codes when the regional provider API exceeds connection limits."
  },
  {
    id: "INC-2415",
    title: "Bulk user import validation loop",
    severity: "Low",
    owner: "Iris Morgan",
    status: "Resolved",
    opened: "2026-08-17T22:09:00Z",
    summary: "Admin uploads with duplicate emails repeatedly show the same validation step instead of a final error summary."
  },
  {
    id: "INC-2416",
    title: "Order timeline missing refunds",
    severity: "Medium",
    owner: "Victor Nunez",
    status: "Identified",
    opened: "2026-08-16T14:17:00Z",
    summary: "Refund events are stored but not shown in the customer-facing order timeline for split-payment orders."
  },
  {
    id: "INC-2417",
    title: "Realtime stock banner flicker",
    severity: "Low",
    owner: "Leah Carter",
    status: "Monitoring",
    opened: "2026-08-15T09:58:00Z",
    summary: "Low-stock banners flicker while websocket reconnects, causing visual noise on high-traffic product pages."
  },
  {
    id: "INC-2418",
    title: "Saved filters disappear",
    severity: "High",
    owner: "Andre Costa",
    status: "Investigating",
    opened: "2026-08-14T17:26:00Z",
    summary: "Saved operational filters disappear from the incident console after users rename a workspace."
  },
  {
    id: "INC-2419",
    title: "API key rotation warning absent",
    severity: "Medium",
    owner: "Tara Wilson",
    status: "Resolved",
    opened: "2026-08-13T06:20:00Z",
    summary: "Developer accounts with expiring API keys do not see the seven-day warning banner after dismissing older notices."
  },
  {
    id: "INC-2420",
    title: "Regional analytics sampling gap",
    severity: "High",
    owner: "Ben Novak",
    status: "Monitoring",
    opened: "2026-08-12T20:03:00Z",
    summary: "Analytics events from the Sao Paulo edge are sampled at the wrong rate after a config migration."
  },
  {
    id: "INC-2421",
    title: "Customer notes save conflict",
    severity: "Medium",
    owner: "Dina Park",
    status: "Identified",
    opened: "2026-08-11T12:39:00Z",
    summary: "Concurrent edits to customer notes can overwrite the latest content without showing a conflict warning."
  },
  {
    id: "INC-2422",
    title: "Promo eligibility cache stale",
    severity: "Low",
    owner: "Alex Miller",
    status: "Resolved",
    opened: "2026-08-10T23:47:00Z",
    summary: "Promotion eligibility remains cached for ten minutes after a loyalty tier downgrade."
  }
];

export function loadIncidents({ shouldFail = false, delay = 550 } = {}) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Simulated network failure while loading incidents."));
        return;
      }
      resolve(baseIncidents.map((incident) => ({ ...incident })));
    }, delay);
  });
}
