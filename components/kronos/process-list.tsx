"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ListPagination } from "@/components/kronos/list-pagination";
import { ProcessCard } from "@/components/kronos/process-card";
import { ProcessTable, SortIcon } from "@/components/kronos/process-table";
import { nextSort, paginate, sortProcesses, UNSORTED, type Process, type SortState } from "@/lib/data";

/** The full process list: table on tablets and up, cards on phones, status sort and paging. */
export function ProcessList({ processes }: { processes: Process[] }) {
  const [sort, setSort] = useState<SortState>(UNSORTED);
  const [page, setPage] = useState(1);
  const view = paginate(sortProcesses(processes, sort), page);

  const toggleSort = () => {
    setSort(nextSort(sort));
    setPage(1);
  };

  return (
    <section className="min-w-0 rounded-lg bg-card p-4 sm:p-6">
      <div className="hidden md:block">
        <ProcessTable processes={view.items} sort={sort} onSort={toggleSort} />
      </div>

      <div className="md:hidden">
        <div className="mb-3 flex justify-end">
          <Button variant="ghost" onClick={toggleSort}>
            Sort by status
            <SortIcon sort={sort} className="text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {view.items.map((p) => (
            <ProcessCard key={p.id} process={p} />
          ))}
        </div>
      </div>

      <ListPagination {...view} onPage={setPage} className="mt-4" />
    </section>
  );
}
