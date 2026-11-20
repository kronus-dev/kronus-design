import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, PaletteIcon } from "lucide-react";

import { DocSection } from "@/components/design-system/doc-section";
import { ListPaginationDemo, NavItemDemo, ProcessTableDemo, ProfileMenuDemo } from "@/components/design-system/kronos-demos";
import { CATEGORIES, COMPONENTS } from "@/components/design-system/registry";
import { TokenSwatches, type TokenGroup } from "@/components/design-system/token-swatches";
import { PageHero } from "@/components/kronos/page-hero";
import { ProcessCard } from "@/components/kronos/process-card";
import { SectionHeading } from "@/components/kronos/section-heading";
import { StatCard } from "@/components/kronos/stat-card";
import { StatusLabel } from "@/components/kronos/status-label";
import { processes, STATUSES } from "@/lib/data";

export const metadata: Metadata = { title: "Design system" };

const TOKENS: TokenGroup[] = [
  {
    title: "Surfaces",
    tokens: [
      { name: "background", note: "Page" },
      { name: "card", note: "Cards, panels" },
      { name: "popover", note: "Menus, popups" },
      { name: "muted" },
      { name: "secondary" },
      { name: "accent", note: "Hover in menus" },
    ],
  },
  {
    title: "Text and lines",
    tokens: [
      { name: "foreground", note: "Body text" },
      { name: "muted-foreground", note: "Secondary text" },
      { name: "primary-foreground", note: "Text on teal" },
      { name: "border" },
      { name: "input", note: "Field background" },
      { name: "ring", note: "Focus ring" },
    ],
  },
  {
    title: "Brand and status",
    tokens: [
      { name: "primary", note: "Teal accent" },
      { name: "success", note: "Good / up" },
      { name: "warning", note: "Waiting" },
      { name: "caution", note: "Needs action" },
      { name: "destructive", note: "Bad / down" },
      { name: "surface-active", note: "Current menu item" },
    ],
  },
  {
    title: "Side menu and charts",
    tokens: [
      { name: "sidebar" },
      { name: "sidebar-accent" },
      { name: "chart-1" },
      { name: "chart-2" },
      { name: "chart-3" },
      { name: "chart-4" },
    ],
  },
];

const TYPE_SCALE = [
  { label: "Page title", className: "text-[26px] sm:text-4xl font-bold tracking-tight text-white", sample: "Kronos" },
  { label: "Key figure", className: "text-3xl font-bold text-white", sample: "148" },
  { label: "Section title", className: "text-xl font-bold text-white", sample: "Processes" },
  { label: "Body", className: "text-sm text-foreground", sample: "Nine people are out this week." },
  { label: "Secondary", className: "text-[13px] text-muted-foreground", sample: "Workforce at a glance" },
  { label: "Field label", className: "text-[11px] font-semibold tracking-wider uppercase text-muted-foreground", sample: "Process owner" },
];

const RADII = ["sm", "md", "lg", "xl", "2xl"] as const;
const radiusClass: Record<(typeof RADII)[number], string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

const NAV = [
  { href: "#foundations", label: "Foundations" },
  { href: "#kronos-components", label: "Kronos components" },
  { href: "#library", label: "Component library" },
];

export default function DesignSystemPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHero
        title="Design system"
        subtitle={`Built on shadcn/ui, adapted to Kronos · ${COMPONENTS.length} base components`}
        icon={PaletteIcon}
        label="Design system"
      />

      <nav aria-label="On this page" className="flex flex-wrap gap-2">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className="rounded-lg bg-card px-3 py-1.5 text-[13px] text-muted-foreground hover:text-white">
            {n.label}
          </a>
        ))}
      </nav>

      <p className="max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
        Every screen in Kronos is built from these pieces. The <strong className="text-foreground">base components</strong> are
        shadcn/ui (Base UI primitives, &ldquo;base-nova&rdquo; style), copied into <code className="text-foreground">components/ui</code> and
        themed through the tokens in <code className="text-foreground">app/globals.css</code>. The <strong className="text-foreground">Kronos components</strong> in{" "}
        <code className="text-foreground">components/kronos</code> combine them into the parts of the product.
      </p>

      {/* Foundations */}
      <SectionHeading title="Foundations" description="Colour, type and shape. Dark only." className="mt-4" />
      <div id="foundations" className="flex scroll-mt-24 flex-col gap-10">
        <DocSection title="Colour tokens" file="app/globals.css" description="Use the token utilities (bg-card, text-muted-foreground, text-success…) rather than raw colours, so a change here updates every screen.">
          <TokenSwatches groups={TOKENS} />
        </DocSection>

        <DocSection title="Status colours" file="lib/data.ts · statusClass()" description="Greens mean it's going well, yellow means waiting, orange needs action, grey is closed.">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {Object.keys(STATUSES).map((s) => (
              <StatusLabel key={s} status={s} />
            ))}
          </div>
        </DocSection>

        <DocSection title="Typography" file="Inter · app/layout.tsx" description="One family, Inter, at 400/500/600/700.">
          <div className="flex flex-col divide-y divide-border">
            {TYPE_SCALE.map((t) => (
              <div key={t.label} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6">
                <div className="w-32 shrink-0 text-xs text-muted-foreground">{t.label}</div>
                <div className={t.className}>{t.sample}</div>
              </div>
            ))}
          </div>
        </DocSection>

        <DocSection title="Radius" file="--radius: 0.5rem" description="Cards and panels use lg. Larger radii are for tiles like the page icon.">
          <div className="flex flex-wrap gap-6">
            {RADII.map((r) => (
              <div key={r} className="text-center">
                <div className={`size-16 border border-border bg-muted ${radiusClass[r]}`} aria-hidden />
                <div className="mt-2 font-mono text-xs text-muted-foreground">rounded-{r}</div>
              </div>
            ))}
          </div>
        </DocSection>
      </div>

      {/* Kronos components */}
      <SectionHeading title="Kronos components" description="Product pieces built from the base components." className="mt-4" />
      <div id="kronos-components" className="flex scroll-mt-24 flex-col gap-10">
        <DocSection title="Page hero" file="components/kronos/page-hero.tsx" description="Top of a page: icon tile (or logo) and title.">
          <PageHero title="Kronos" subtitle="Human resources dashboard" className="bg-background" />
        </DocSection>

        <DocSection title="Section heading" file="components/kronos/section-heading.tsx">
          <SectionHeading title="Overview" description="Workforce at a glance" className="mb-0" />
        </DocSection>

        <DocSection title="Stat card" file="components/kronos/stat-card.tsx" description="A key figure. trend=&quot;up&quot; shows the change in green, &quot;down&quot; in red.">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Active employees" value="148" delta="+2.8%" trend="up" className="bg-background" />
            <StatCard label="Out this week" value="9" delta="+2" trend="down" className="bg-background" />
          </div>
        </DocSection>

        <DocSection title="Status label" file="components/kronos/status-label.tsx" description="A process status in its colour. See Status colours above.">
          <div className="flex gap-6">
            <StatusLabel status="Awarded" />
            <StatusLabel status="Under evaluation" />
            <StatusLabel status="Cancelled" />
          </div>
        </DocSection>

        <DocSection title="Process table" file="components/kronos/process-table.tsx" description="Built on Table. Click Status to sort: A to Z, Z to A, then off.">
          <ProcessTableDemo />
        </DocSection>

        <DocSection title="Process card" file="components/kronos/process-card.tsx" description="The phone layout of one process.">
          <div className="max-w-sm">
            <ProcessCard process={processes[0]} />
          </div>
        </DocSection>

        <DocSection title="List pagination" file="components/kronos/list-pagination.tsx" description="Built on Button. Page numbers hide on phones.">
          <ListPaginationDemo />
        </DocSection>

        <DocSection title="Nav item" file="components/kronos/app-shell.tsx" description="Side-menu entry, expanded and collapsed. Collapsed items show a Tooltip.">
          <NavItemDemo />
        </DocSection>

        <DocSection title="Profile menu" file="components/kronos/app-shell.tsx" description="Built on Dropdown Menu and Avatar.">
          <ProfileMenuDemo />
        </DocSection>
      </div>

      {/* Library */}
      <SectionHeading title="Component library" description={`All ${COMPONENTS.length} shadcn/ui components, themed for Kronos. Open one to see its examples.`} className="mt-4" />
      <div id="library" className="flex scroll-mt-24 flex-col gap-8">
        {CATEGORIES.map((category) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-semibold text-white">{category}</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {COMPONENTS.filter((c) => c.category === category).map((c) => (
                <Link
                  key={c.slug}
                  href={`/design-system/${c.slug}`}
                  className="group flex min-w-0 flex-col gap-1 rounded-lg bg-card p-4 outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span className="flex items-center justify-between gap-2 font-medium text-white">
                    {c.title}
                    <ArrowRightIcon aria-hidden className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-[13px] text-muted-foreground">{c.description}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
