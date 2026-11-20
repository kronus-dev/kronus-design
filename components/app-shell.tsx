"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  DocumentTextIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

type NavItem = { label: string; icon: ComponentType<SVGProps<SVGSVGElement>>; current?: boolean };

// TODO: point each item at a real page. Only the dashboard exists for now.
const NAV: NavItem[] = [
  { label: "Dashboard", icon: HomeIcon, current: true },
  { label: "Employees", icon: UsersIcon },
  { label: "Sites & crews", icon: BuildingOfficeIcon },
  { label: "Attendance", icon: ClockIcon },
  { label: "Leave & absences", icon: CalendarDaysIcon },
  { label: "Certifications", icon: CheckBadgeIcon },
  { label: "Health & safety", icon: ShieldCheckIcon },
  { label: "Timesheets", icon: DocumentTextIcon },
  { label: "Recruitment", icon: BriefcaseIcon },
];

// Static demo: there is no sign-in, so the header shows a demo user.
const USER = { name: "Demo User", initials: "DU", note: "Static demo · sample data" };

export function AppShell({ children }: { children: ReactNode }) {
  // The floating menu: collapsed rail (false) or expanded (true).
  const [side, setSide] = useState(false);

  useEffect(() => {
    if (!side) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSide(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [side]);

  return (
    <>
      {/* Backdrop: click to close the open menu */}
      {side && (
        <button
          type="button"
          onClick={() => setSide(false)}
          aria-label="Close menu"
          className="fixed inset-0 z-40 cursor-default bg-zinc-900/45"
        />
      )}

      {/* Floating menu. It overlays the page and never pushes the content. */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex-col gap-1 overflow-y-auto overflow-x-hidden bg-[#222327] px-3 pb-4 pt-6 transition-[width] duration-200 ${
          side ? "flex w-64 shadow-2xl shadow-black/40" : "hidden w-20 lg:flex"
        }`}
      >
        <div className={`flex min-h-9 items-center px-2 pb-6 ${side ? "justify-between" : "justify-center"}`}>
          {side && <span className="text-2xl font-bold tracking-tight text-white">Kronos</span>}
          <button
            type="button"
            onClick={() => setSide(!side)}
            aria-expanded={side}
            aria-label={side ? "Collapse menu" : "Expand menu"}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/5"
          >
            {side ? <ChevronLeftIcon className="size-[18px]" /> : <ChevronRightIcon className="size-[18px]" />}
          </button>
        </div>

        <nav aria-label="Main" className="flex flex-1 flex-col gap-1">
          {NAV.map(({ label, icon: Icon, current }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              aria-current={current ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium ${side ? "" : "justify-center"} ${
                current ? "bg-[#1b3f40] text-teal-200" : "text-zinc-400 hover:bg-white/5"
              }`}
            >
              <Icon className="size-[18px] shrink-0" />
              {side && <span className="whitespace-nowrap">{label}</span>}
            </a>
          ))}

          <button
            type="button"
            aria-label="Log out"
            title="No sign-in in the static demo"
            disabled
            className={`mt-auto flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-zinc-400 disabled:cursor-not-allowed ${
              side ? "" : "justify-center"
            }`}
          >
            <ArrowRightStartOnRectangleIcon className="size-[18px] shrink-0" />
            {side && <span className="whitespace-nowrap">Log Out</span>}
          </button>
        </nav>
      </aside>

      {/* Top bar: phones and tablets only. Opens the same floating menu. */}
      <div className="flex items-center justify-between bg-[#222327] px-4 py-3 lg:hidden">
        <span className="text-[22px] font-bold tracking-tight text-white">Kronos</span>
        <button
          type="button"
          onClick={() => setSide(true)}
          aria-expanded={side}
          className="flex h-8 items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3 text-sm font-medium text-white hover:bg-white/15"
        >
          <Bars3Icon className="size-4" />
          Menu
        </button>
      </div>

      {/* Header: sticky, aligned to the centred content column */}
      <header className="sticky top-0 z-30 border-b border-zinc-700 bg-[#303136] px-4 sm:px-6 lg:px-24">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-end gap-3">
          <label className="relative hidden md:block">
            <span className="sr-only">Search processes, clients and employees</span>
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              placeholder="Search…"
              className="h-10 w-70 rounded-lg border border-white/10 bg-white/10 pl-9 pr-3 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </label>

          <button
            type="button"
            aria-label="Notifications"
            className="flex size-10 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <BellIcon className="size-5" />
          </button>

          <ProfileMenu />
        </div>
      </header>

      {/* Content stays centred; side padding clears the collapsed rail on desktop */}
      <main className="px-4 py-8 sm:px-6 lg:px-24">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </>
  );
}

function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-white/10"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
          {USER.initials}
        </span>
        <span className="text-sm font-medium text-white">{USER.name}</span>
        <ChevronDownIcon className="size-4 text-zinc-400" />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 z-50 mt-2 min-w-48 rounded-lg border border-white/10 bg-zinc-800 p-1 shadow-lg">
          <div className="px-3 py-2">
            <div className="text-sm font-semibold text-white">{USER.name}</div>
            <div className="text-xs text-zinc-400">{USER.note}</div>
          </div>
        </div>
      )}
    </div>
  );
}
