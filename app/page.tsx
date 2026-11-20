import type { Metadata } from "next";
import { PageHero } from "@/components/kronos/page-hero";
import { ProcessList } from "@/components/kronos/process-list";
import { SectionHeading } from "@/components/kronos/section-heading";
import { StatCard } from "@/components/kronos/stat-card";
import { kpis, processes } from "@/lib/data";

export const metadata: Metadata = { title: "Dashboard" };

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHero title="Kronos" subtitle="Human resources dashboard" />

      <SectionHeading title="Overview" description="Workforce at a glance" />
      <section aria-label="Key figures" className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.label} label={kpi.label} value={kpi.value} delta={kpi.delta} trend={kpi.up ? "up" : "down"} />
        ))}
      </section>

      <SectionHeading title="Processes" description={`${processes.length} processes`} />
      <ProcessList processes={processes} />
    </div>
  );
}
