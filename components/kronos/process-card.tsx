import { StatusLabel } from "@/components/kronos/status-label";
import { cn } from "@/lib/utils";
import type { Process } from "@/lib/data";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{label}</div>
      {children}
    </div>
  );
}

/** One process as a card (phones). */
export function ProcessCard({ process: p, className }: { process: Process; className?: string }) {
  return (
    <article
      data-slot="process-card"
      className={cn("grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-lg border border-border p-4 text-sm", className)}
    >
      <Field label="Process number">
        <div className="font-semibold text-white tabular-nums">{p.code}</div>
      </Field>
      <Field label="Status">
        <StatusLabel status={p.status} className="block" />
      </Field>
      <Field label="Client name" className="col-span-2">
        <div className="text-white">{p.client}</div>
      </Field>
      <Field label="Process type">
        <div>{p.type}</div>
      </Field>
      <Field label="Process owner">
        <div>{p.owner}</div>
      </Field>
      <Field label="Est. delivery date">
        <div className="tabular-nums">{p.deliveryDate}</div>
      </Field>
    </article>
  );
}
