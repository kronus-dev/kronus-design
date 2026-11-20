import type { Metadata } from "next";
import { BuildingOfficeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ProcessList } from "@/components/process-list";
import { kpis, processes } from "@/lib/data";

export const metadata: Metadata = { title: "Dashboard" };

const COMPANY = "Kronos";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero: company logo and name */}
      <section aria-label="Company" className="flex min-w-0 items-center gap-4 rounded-lg bg-[#222327] p-5 sm:gap-6 sm:p-8">
        {/* Replace with the company logo when there is one. */}
        <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-teal-200 text-zinc-900 sm:size-[72px]">
          <BuildingOfficeIcon className="size-7 sm:size-9" />
        </span>
        <div className="min-w-0">
          <h1 className="break-words text-[26px] font-bold tracking-tight text-white sm:text-4xl">{COMPANY}</h1>
          <p className="mt-1 text-sm text-zinc-400">Human resources dashboard</p>
        </div>
      </section>

      {/* Overview */}
      <div className="-mb-2">
        <h2 className="text-xl font-bold text-white">Overview</h2>
        <p className="mt-1.5 text-[13px] text-zinc-400">Workforce at a glance</p>
      </div>

      <section aria-label="Key figures" className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="min-w-0 rounded-lg bg-[#222327] px-6 py-5">
            <div className="flex items-center justify-between gap-2 text-[13px] text-zinc-400">
              <span>{kpi.label}</span>
              <ChevronRightIcon className="size-4 shrink-0 text-zinc-200" />
            </div>
            <div className="mt-1.5 flex items-end justify-between gap-2">
              <span className="text-3xl font-bold leading-tight text-white">{kpi.value}</span>
              <span className={`text-[13px] ${kpi.up ? "text-emerald-300" : "text-red-300"}`}>{kpi.delta}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Processes */}
      <div className="-mb-2">
        <h2 className="text-xl font-bold text-white">Processes</h2>
        <p className="mt-1.5 text-[13px] text-zinc-400">{processes.length} processes</p>
      </div>

      <ProcessList processes={processes} />
    </div>
  );
}
