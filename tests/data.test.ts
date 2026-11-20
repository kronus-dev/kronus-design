import { describe, expect, it } from "vitest";
import { nextSort, paginate, processes, sortProcesses, STATUSES, statusClass, UNSORTED } from "@/lib/data";

describe("status labels", () => {
  it("are exactly the nine agreed labels", () => {
    expect(Object.keys(STATUSES).sort()).toEqual(
      [
        "Started", "Not started", "Not sent", "Under evaluation", "Cancelled",
        "Rejected", "In revision", "Awarded", "Client data missing",
      ].sort(),
    );
  });

  it("each have their own colour", () => {
    for (const status of Object.keys(STATUSES)) {
      expect(statusClass(status), status).not.toBe(statusClass(null));
    }
  });
});

describe("sample processes", () => {
  it("has 34 complete processes, newest first", () => {
    expect(processes).toHaveLength(34);
    expect(processes[0].code).toBe("P-2026-034");
    for (const p of processes) {
      expect(p.client && p.type && p.owner && p.status && p.deliveryDate).toBeTruthy();
      expect(p.deliveryDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("sorting", () => {
  it("cycles unsorted -> asc -> desc -> unsorted", () => {
    const asc = nextSort(UNSORTED);
    const desc = nextSort(asc);
    expect(asc).toEqual({ by: "status", direction: "asc" });
    expect(desc).toEqual({ by: "status", direction: "desc" });
    expect(nextSort(desc)).toEqual(UNSORTED);
  });

  it("orders by status name, then newest process number", () => {
    const asc = sortProcesses(processes, { by: "status", direction: "asc" });
    expect(asc[0].status).toBe("Awarded");
    const names = asc.map((p) => p.status);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));

    const awarded = asc.filter((p) => p.status === "Awarded").map((p) => p.code);
    expect(awarded).toEqual([...awarded].sort().reverse());

    expect(sortProcesses(processes, { by: "status", direction: "desc" })[0].status).toBe("Under evaluation");
  });

  it("does not change the original list", () => {
    const before = processes.map((p) => p.code);
    sortProcesses(processes, { by: "status", direction: "asc" });
    expect(processes.map((p) => p.code)).toEqual(before);
  });
});

describe("pagination", () => {
  it("shows ten per page and clamps out-of-range pages", () => {
    expect(paginate(processes, 1)).toMatchObject({ page: 1, lastPage: 4, from: 1, to: 10, total: 34 });
    expect(paginate(processes, 4)).toMatchObject({ from: 31, to: 34 });
    expect(paginate(processes, 4).items).toHaveLength(4);
    expect(paginate(processes, 99).page).toBe(4);
    expect(paginate([], 1)).toMatchObject({ page: 1, lastPage: 1, from: 0, to: 0 });
  });
});
