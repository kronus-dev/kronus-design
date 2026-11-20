"use client";

import { useState } from "react";
import { BadgeCheckIcon, HouseIcon, PaletteIcon } from "lucide-react";
import { NavItem, ProfileMenu } from "@/components/kronos/app-shell";
import { ListPagination } from "@/components/kronos/list-pagination";
import { ProcessTable } from "@/components/kronos/process-table";
import { nextSort, paginate, processes, sortProcesses, UNSORTED, type SortState } from "@/lib/data";

/** Interactive previews of the Kronos components that need state. */

export function ProcessTableDemo() {
  const [sort, setSort] = useState<SortState>(UNSORTED);
  return (
    <ProcessTable processes={sortProcesses(processes, sort).slice(0, 4)} sort={sort} onSort={() => setSort(nextSort(sort))} />
  );
}

export function ListPaginationDemo() {
  const [page, setPage] = useState(2);
  return <ListPagination {...paginate(processes, page)} onPage={setPage} />;
}

export function NavItemDemo() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex w-56 flex-col gap-1 rounded-lg bg-sidebar p-3">
        <NavItem entry={{ label: "Dashboard", icon: HouseIcon, href: "/" }} expanded current />
        <NavItem entry={{ label: "Certifications", icon: BadgeCheckIcon }} expanded />
        <NavItem entry={{ label: "Design system", icon: PaletteIcon, href: "/design-system" }} expanded />
      </div>
      <div className="flex w-20 flex-col gap-1 rounded-lg bg-sidebar p-3">
        <NavItem entry={{ label: "Dashboard", icon: HouseIcon, href: "/" }} expanded={false} current />
        <NavItem entry={{ label: "Certifications", icon: BadgeCheckIcon }} expanded={false} />
        <NavItem entry={{ label: "Design system", icon: PaletteIcon, href: "/design-system" }} expanded={false} />
      </div>
    </div>
  );
}

export function ProfileMenuDemo() {
  return <ProfileMenu />;
}
