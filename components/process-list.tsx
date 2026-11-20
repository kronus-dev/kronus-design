"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { nextSort, paginate, sortProcesses, statusClass, UNSORTED, type Process, type SortState } from "@/lib/data";

const th = "py-3 px-3 first:ps-0 last:pe-0 text-sm font-medium text-white border-b border-white/20";
const td = "py-3 px-3 first:ps-0 last:pe-0 text-sm text-zinc-300 border-white/20 [tr:not(:first-child)>&]:border-t";
const label = "text-[11px] font-semibold uppercase tracking-wider text-zinc-400";

export function ProcessList({ processes }: { processes: Process[] }) {
  const [sort, setSort] = useState<SortState>(UNSORTED);
  const [page, setPage] = useState(1);

  const view = paginate(sortProcesses(processes, sort), page);

  const toggleSort = () => {
    setSort(nextSort(sort));
    setPage(1);
  };

  const SortIcon = sort.by !== "status" ? ChevronUpDownIcon : sort.direction === "asc" ? ChevronUpIcon : ChevronDownIcon;
  const ariaSort = sort.by !== "status" ? "none" : sort.direction === "asc" ? "ascending" : "descending";

  return (
    <section className="min-w-0 rounded-lg bg-[#222327] p-4 sm:p-6">
      {/* Table: tablets and up */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-0 whitespace-nowrap">
          <thead>
            <tr>
              <th className={`${th} text-start`}>Process number</th>
              <th className={`${th} text-center`}>Client name</th>
              <th className={`${th} text-center`}>Process type</th>
              <th className={`${th} text-center`}>Process owner</th>
              <th className={`${th} text-center`}>Est. delivery date</th>
              <th className={`${th} text-end`} aria-sort={ariaSort}>
                <button
                  type="button"
                  onClick={toggleSort}
                  className="group -my-1 ms-auto flex items-center gap-1 rounded py-1 ps-2 hover:text-white"
                >
                  <SortIcon
                    className={`size-4 ${sort.by === "status" ? "text-white" : "text-zinc-400 opacity-0 group-hover:opacity-100"}`}
                  />
                  Status
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {view.items.map((p) => (
              <tr key={p.id}>
                <td className={`${td} font-medium text-white tabular-nums`}>{p.code}</td>
                <td className={`${td} whitespace-normal text-center`}>{p.client}</td>
                <td className={`${td} whitespace-normal text-center`}>{p.type}</td>
                <td className={`${td} whitespace-normal text-center`}>{p.owner}</td>
                <td className={`${td} text-center tabular-nums`}>{p.deliveryDate}</td>
                <td className={`${td} text-end font-medium`}>
                  <span className={statusClass(p.status)}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards: phones */}
      <div className="md:hidden">
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={toggleSort}
            className="flex h-8 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-zinc-200 hover:bg-white/10"
          >
            Sort by status
            <SortIcon className="size-4 text-zinc-400" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {view.items.map((p) => (
            <article key={p.id} className="grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-lg border border-zinc-700 p-4 text-sm">
              <div>
                <div className={label}>Process number</div>
                <div className="font-semibold tabular-nums text-white">{p.code}</div>
              </div>
              <div>
                <div className={label}>Status</div>
                <div className={`font-medium ${statusClass(p.status)}`}>{p.status}</div>
              </div>
              <div className="col-span-2">
                <div className={label}>Client name</div>
                <div className="text-white">{p.client}</div>
              </div>
              <div>
                <div className={label}>Process type</div>
                <div>{p.type}</div>
              </div>
              <div>
                <div className={label}>Process owner</div>
                <div>{p.owner}</div>
              </div>
              <div>
                <div className={label}>Est. delivery date</div>
                <div className="tabular-nums">{p.deliveryDate}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Pagination {...view} onPage={setPage} />
    </section>
  );
}

function Pagination({
  page, lastPage, from, to, total, onPage,
}: { page: number; lastPage: number; from: number; to: number; total: number; onPage: (page: number) => void }) {
  const idle = "text-zinc-400 hover:bg-white/20 hover:text-white";
  const nav = "flex size-6 items-center justify-center rounded-[6px] disabled:text-zinc-500 disabled:hover:bg-transparent";

  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center justify-between gap-3 border-t border-zinc-700 pt-3">
      <div className="whitespace-nowrap text-xs font-medium text-zinc-400">
        Showing {from} to {to} of {total} results
      </div>
      <div className="flex items-center rounded-[8px] border border-white/10 bg-white/10 p-px">
        <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onPage(page - 1)} className={`${nav} ${idle}`}>
          <ChevronLeftIcon className="size-4" />
        </button>
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((n) =>
          n === page ? (
            <span key={n} aria-current="page" className="flex h-6 items-center rounded-[6px] px-2 text-xs font-medium text-white">
              {n}
            </span>
          ) : (
            <button key={n} type="button" onClick={() => onPage(n)} className={`hidden h-6 rounded-[6px] px-2 text-xs font-medium sm:block ${idle}`}>
              {n}
            </button>
          ),
        )}
        <button type="button" aria-label="Next page" disabled={page === lastPage} onClick={() => onPage(page + 1)} className={`${nav} ${idle}`}>
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </nav>
  );
}
