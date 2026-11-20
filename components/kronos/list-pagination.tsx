"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ListPaginationProps = {
  page: number;
  lastPage: number;
  from: number;
  to: number;
  total: number;
  onPage: (page: number) => void;
  className?: string;
};

/** "Showing 1 to 10 of 34 results" with previous / page numbers / next. Page numbers hide on phones. */
export function ListPagination({ page, lastPage, from, to, total, onPage, className }: ListPaginationProps) {
  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-between gap-3 border-t border-border pt-3", className)}>
      <div className="text-xs font-medium whitespace-nowrap text-muted-foreground">
        Showing {from} to {to} of {total} results
      </div>
      <div className="flex items-center rounded-lg border border-input bg-input p-px">
        <Button variant="ghost" size="icon-xs" aria-label="Previous page" disabled={page === 1} onClick={() => onPage(page - 1)}>
          <ChevronLeftIcon />
        </Button>
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((n) =>
          n === page ? (
            <span key={n} aria-current="page" className="flex h-6 items-center px-2 text-xs font-medium text-white">
              {n}
            </span>
          ) : (
            <Button key={n} variant="ghost" size="xs" className="hidden text-muted-foreground sm:inline-flex" onClick={() => onPage(n)}>
              {n}
            </Button>
          ),
        )}
        <Button variant="ghost" size="icon-xs" aria-label="Next page" disabled={page === lastPage} onClick={() => onPage(page + 1)}>
          <ChevronRightIcon />
        </Button>
      </div>
    </nav>
  );
}
