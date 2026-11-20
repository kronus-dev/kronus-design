"use client";

import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusLabel } from "@/components/kronos/status-label";
import { cn } from "@/lib/utils";
import type { Process, SortState } from "@/lib/data";

const head = "h-auto py-3 px-3 first:ps-0 last:pe-0 text-sm font-medium text-white";
const cell = "py-3 px-3 first:ps-0 last:pe-0 text-sm text-zinc-300";

export function SortIcon({ sort, className }: { sort: SortState; className?: string }) {
  const Icon = sort.by !== "status" ? ChevronsUpDownIcon : sort.direction === "asc" ? ChevronUpIcon : ChevronDownIcon;
  return <Icon aria-hidden className={cn("size-4", className)} />;
}

/** Processes as a table (tablets and up). Status is the sortable column. */
export function ProcessTable({
  processes,
  sort,
  onSort,
  className,
}: {
  processes: Process[];
  sort: SortState;
  onSort: () => void;
  className?: string;
}) {
  const ariaSort = sort.by !== "status" ? "none" : sort.direction === "asc" ? "ascending" : "descending";

  return (
    <Table className={cn("whitespace-nowrap", className)}>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className={cn(head, "text-start")}>Process number</TableHead>
          <TableHead className={cn(head, "text-center")}>Client name</TableHead>
          <TableHead className={cn(head, "text-center")}>Process type</TableHead>
          <TableHead className={cn(head, "text-center")}>Process owner</TableHead>
          <TableHead className={cn(head, "text-center")}>Est. delivery date</TableHead>
          <TableHead className={cn(head, "text-end")} aria-sort={ariaSort}>
            <button
              type="button"
              onClick={onSort}
              className="group -my-1 ms-auto flex items-center gap-1 rounded py-1 ps-2 outline-none hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <SortIcon
                sort={sort}
                className={sort.by === "status" ? "text-white" : "text-muted-foreground opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}
              />
              Status
            </button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {processes.map((p) => (
          <TableRow key={p.id}>
            <TableCell className={cn(cell, "font-medium text-white tabular-nums")}>{p.code}</TableCell>
            <TableCell className={cn(cell, "text-center whitespace-normal")}>{p.client}</TableCell>
            <TableCell className={cn(cell, "text-center whitespace-normal")}>{p.type}</TableCell>
            <TableCell className={cn(cell, "text-center whitespace-normal")}>{p.owner}</TableCell>
            <TableCell className={cn(cell, "text-center tabular-nums")}>{p.deliveryDate}</TableCell>
            <TableCell className={cn(cell, "text-end")}>
              <StatusLabel status={p.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
