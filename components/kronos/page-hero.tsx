import type { ComponentType, SVGProps } from "react";
import { BuildingIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** The banner at the top of a page: an icon tile (or logo) next to a big title. */
export function PageHero({
  title,
  subtitle,
  icon: Icon = BuildingIcon,
  label = "Company",
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  label?: string;
  className?: string;
}) {
  return (
    <section
      aria-label={label}
      data-slot="page-hero"
      className={cn("flex min-w-0 items-center gap-4 rounded-lg bg-card p-5 sm:gap-6 sm:p-8", className)}
    >
      <span
        aria-hidden="true"
        className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground sm:size-[72px]"
      >
        <Icon className="size-7 sm:size-9" />
      </span>
      <div className="min-w-0">
        <h1 className="text-[26px] font-bold tracking-tight break-words text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}
