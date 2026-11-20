"use client";

import { useEffect, useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FileTextIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PaletteIcon,
  SearchIcon,
  ShieldCheckIcon,
  UsersIcon,
  BadgeCheckIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
export type NavEntry = { label: string; icon: Icon; href?: string };

// TODO: give the other sections real pages. Only Dashboard and Design system exist for now.
export const MAIN_NAV: NavEntry[] = [
  { label: "Dashboard", icon: HouseIcon, href: "/" },
  { label: "Employees", icon: UsersIcon },
  { label: "Sites & crews", icon: BuildingIcon },
  { label: "Attendance", icon: ClockIcon },
  { label: "Leave & absences", icon: CalendarDaysIcon },
  { label: "Certifications", icon: BadgeCheckIcon },
  { label: "Health & safety", icon: ShieldCheckIcon },
  { label: "Timesheets", icon: FileTextIcon },
  { label: "Recruitment", icon: BriefcaseIcon },
];

export const FOOTER_NAV: NavEntry[] = [{ label: "Design system", icon: PaletteIcon, href: "/design-system" }];

// Static demo: there is no sign-in, so the header shows a demo user.
const USER = { name: "Demo User", initials: "DU", note: "Static demo · sample data" };

const isCurrent = (pathname: string, href?: string) => {
  if (!href) return false;
  const path = pathname.replace(/\/$/, "") || "/";
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
};

/** One side-menu entry. Collapsed, it shows only the icon with a tooltip. */
export function NavItem({
  entry,
  expanded,
  current,
  onNavigate,
}: {
  entry: NavEntry;
  expanded: boolean;
  current?: boolean;
  onNavigate?: () => void;
}) {
  const { label, icon: Icon, href } = entry;
  const className = cn(
    "flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium outline-none focus-visible:ring-3 focus-visible:ring-sidebar-ring",
    expanded ? "" : "justify-center",
    current ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-white/5",
  );
  const content = (
    <>
      <Icon aria-hidden className="size-[18px] shrink-0" />
      {expanded && <span className="whitespace-nowrap">{label}</span>}
    </>
  );
  const item = href ? (
    <Link href={href} aria-label={label} aria-current={current ? "page" : undefined} className={className} onClick={onNavigate}>
      {content}
    </Link>
  ) : (
    <a href="#" aria-label={label} className={className}>
      {content}
    </a>
  );

  if (expanded) return item;
  return (
    <Tooltip>
      <TooltipTrigger render={item} />
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  // The floating menu: collapsed rail (false) or expanded (true).
  const [side, setSide] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!side) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSide(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [side]);

  const close = () => setSide(false);

  return (
    <>
      {/* Backdrop: click to close the open menu */}
      {side && (
        <button type="button" onClick={close} aria-label="Close menu" className="fixed inset-0 z-40 cursor-default bg-zinc-900/45" />
      )}

      {/* Floating menu. It overlays the page and never pushes the content. */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex-col gap-1 overflow-x-hidden overflow-y-auto bg-sidebar px-3 pt-6 pb-4 transition-[width] duration-200",
          side ? "flex w-64 shadow-2xl shadow-black/40" : "hidden w-20 lg:flex",
        )}
      >
        <div className={cn("flex min-h-9 items-center px-2 pb-6", side ? "justify-between" : "justify-center")}>
          {side && <span className="text-2xl font-bold tracking-tight text-white">Kronos</span>}
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setSide(!side)}
            aria-expanded={side}
            aria-label={side ? "Collapse menu" : "Expand menu"}
            className="text-sidebar-foreground hover:bg-white/5"
          >
            {side ? <ChevronLeftIcon className="size-[18px]" /> : <ChevronRightIcon className="size-[18px]" />}
          </Button>
        </div>

        <nav aria-label="Main" className="flex flex-1 flex-col gap-1">
          {MAIN_NAV.map((entry) => (
            <NavItem key={entry.label} entry={entry} expanded={side} current={isCurrent(pathname, entry.href)} onNavigate={close} />
          ))}

          <div className="mt-auto flex flex-col gap-1 border-t border-sidebar-border pt-3">
            {FOOTER_NAV.map((entry) => (
              <NavItem key={entry.label} entry={entry} expanded={side} current={isCurrent(pathname, entry.href)} onNavigate={close} />
            ))}
            <button
              type="button"
              aria-label="Log out"
              title="No sign-in in the static demo"
              disabled
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-sidebar-foreground disabled:cursor-not-allowed",
                side ? "" : "justify-center",
              )}
            >
              <LogOutIcon aria-hidden className="size-[18px] shrink-0" />
              {side && <span className="whitespace-nowrap">Log Out</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* Top bar: phones and tablets only. Opens the same floating menu. */}
      <div className="flex items-center justify-between bg-sidebar px-4 py-3 lg:hidden">
        <span className="text-[22px] font-bold tracking-tight text-white">Kronos</span>
        <Button variant="secondary" onClick={() => setSide(true)} aria-expanded={side}>
          <MenuIcon />
          Menu
        </Button>
      </div>

      <AppHeader />

      {/* Content stays centred; side padding clears the collapsed rail on desktop */}
      <main className="px-4 py-8 sm:px-6 lg:px-24">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </>
  );
}

/** Sticky header: search, notifications and the user menu. */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background px-4 sm:px-6 lg:px-24">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-end gap-3">
        <InputGroup className="hidden h-10 w-70 md:flex">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput type="search" placeholder="Search…" aria-label="Search processes, clients and employees" />
        </InputGroup>

        <Button variant="ghost" size="icon-lg" aria-label="Notifications" className="text-muted-foreground">
          <BellIcon className="size-5" />
        </Button>

        <ProfileMenu />
      </div>
    </header>
  );
}

export function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="lg" className="h-10 gap-2 pr-2 pl-1" />}>
        <Avatar>
          <AvatarFallback className="text-xs font-semibold">{USER.initials}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-white">{USER.name}</span>
        <ChevronDownIcon className="text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="text-sm font-semibold text-foreground">{USER.name}</div>
            <div className="text-xs font-normal">{USER.note}</div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/design-system" />}>
          <PaletteIcon />
          Design system
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
