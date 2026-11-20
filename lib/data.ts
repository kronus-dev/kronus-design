/**
 * Sample data and list logic for the dashboard.
 * The site is static (GitHub Pages), so everything here is computed in the
 * browser or at build time. Swap `processes` for real data when there is an API.
 */

/** Status labels, exactly as used across the app. Value: is the process closed? */
export const STATUSES = {
  Started: false,
  "Not started": false,
  "Not sent": false,
  "Under evaluation": false,
  Cancelled: true,
  Rejected: true,
  "In revision": false,
  Awarded: true,
  "Client data missing": false,
} as const;

export type Status = keyof typeof STATUSES;

export type Process = {
  id: number;
  code: string;
  client: string;
  type: string;
  owner: string;
  /** Estimated delivery date, YYYY-MM-DD. */
  deliveryDate: string;
  status: Status;
};

export type Kpi = { label: string; value: string; delta: string; up: boolean };

// TODO: replace with real figures once there are employee, attendance, leave and certification data.
export const kpis: Kpi[] = [
  { label: "Active employees", value: "148", delta: "+2.8%", up: true },
  { label: "On site · last working day", value: "108", delta: "-3.2%", up: false },
  { label: "Out this week", value: "9", delta: "+2", up: false },
  { label: "Certificates expiring ≤ 30 days", value: "14", delta: "+5", up: false },
];

/** Pastel text colour per status. Only greens, greys, yellow and orange. */
export function statusClass(status: string | null | undefined): string {
  switch (status) {
    case "Awarded":
      return "text-emerald-300";
    case "Started":
      return "text-emerald-200";
    case "Not started":
      return "text-zinc-200";
    case "Not sent":
    case "Under evaluation":
      return "text-yellow-200";
    case "In revision":
    case "Client data missing":
      return "text-orange-300";
    case "Cancelled":
      return "text-zinc-400 line-through";
    case "Rejected":
      return "text-zinc-400";
    default:
      return "text-zinc-300";
  }
}

const TYPES = ["Construction", "Renovation", "Maintenance", "Inspection", "Consulting"];
const CLIENTS = [
  "Atlântico Engenharia", "Norte Obras", "Lisboa Metro", "Câmara Municipal de Braga",
  "Porto Logística", "Hospital São João", "Algarve Resorts", "EDP Distribuição",
];
const OWNERS = ["Ana Ferreira", "Bruno Costa", "Carla Mendes", "Diogo Santos", "Inês Martins", "João Pereira"];

const addDays = (isoDate: string, days: number) => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

/** 34 made-up processes, newest first. */
export const processes: Process[] = Array.from({ length: 34 }, (_, n) => {
  const i = n + 1;
  const statuses = Object.keys(STATUSES) as Status[];
  const entry = addDays("2026-01-12", i * 9);
  return {
    id: i,
    code: `P-2026-${String(i).padStart(3, "0")}`,
    client: CLIENTS[i % CLIENTS.length],
    type: TYPES[i % TYPES.length],
    owner: OWNERS[i % OWNERS.length],
    deliveryDate: addDays(entry, 45 + (i % 5) * 15),
    status: statuses[(i * 4) % statuses.length],
  };
}).reverse();

export type SortState = { by: "" | "status"; direction: "asc" | "desc" };

export const UNSORTED: SortState = { by: "", direction: "asc" };

/** Clicking Status cycles: unsorted -> A to Z -> Z to A -> unsorted. */
export function nextSort(current: SortState): SortState {
  if (current.by !== "status") return { by: "status", direction: "asc" };
  if (current.direction === "asc") return { by: "status", direction: "desc" };
  return UNSORTED;
}

/** Default order is process number, newest first. Sorting by status keeps that as the tie-breaker. */
export function sortProcesses(list: Process[], sort: SortState): Process[] {
  const byCodeDesc = (a: Process, b: Process) => b.code.localeCompare(a.code);
  if (sort.by !== "status") return [...list].sort(byCodeDesc);
  const sign = sort.direction === "desc" ? -1 : 1;
  return [...list].sort((a, b) => sign * a.status.localeCompare(b.status) || byCodeDesc(a, b));
}

export const PER_PAGE = 10;

export function paginate<T>(list: T[], page: number, perPage = PER_PAGE) {
  const lastPage = Math.max(1, Math.ceil(list.length / perPage));
  const current = Math.min(Math.max(1, page), lastPage);
  const start = (current - 1) * perPage;
  return {
    items: list.slice(start, start + perPage),
    page: current,
    lastPage,
    from: list.length ? start + 1 : 0,
    to: Math.min(start + perPage, list.length),
    total: list.length,
  };
}
