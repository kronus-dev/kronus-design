import { ChevronRightIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  label: string;
  value: string;
  /** Change since the last period, e.g. "+2.8%". */
  delta?: string;
  /** Whether the change is good (green) or bad (red). */
  trend?: "up" | "down";
  className?: string;
};

/** A key figure with its change, as used in the dashboard overview. */
export function StatCard({ label, value, delta, trend = "up", className }: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("min-w-0 gap-0 rounded-lg px-6 py-5 ring-0", className)}>
      <div className="flex items-center justify-between gap-2 text-[13px] text-muted-foreground">
        <span>{label}</span>
        <ChevronRightIcon aria-hidden className="size-4 shrink-0 text-zinc-200" />
      </div>
      <div className="mt-1.5 flex items-end justify-between gap-2">
        <span className="text-3xl leading-tight font-bold text-white">{value}</span>
        {delta && (
          <span className={cn("text-[13px]", trend === "up" ? "text-success" : "text-destructive")}>{delta}</span>
        )}
      </div>
    </Card>
  );
}
