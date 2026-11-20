import { cn } from "@/lib/utils";

/** A documented item on the design-system page: name, what it's for, where the code lives, and a live preview. */
export function DocSection({
  id,
  title,
  description,
  file,
  children,
  className,
}: {
  id?: string;
  title: string;
  description?: React.ReactNode;
  file?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        {file && <code className="font-mono text-xs text-muted-foreground">{file}</code>}
      </div>
      {description && <p className="mb-4 max-w-3xl text-[13px] text-muted-foreground">{description}</p>}
      <div className="rounded-lg border border-border bg-card p-6">{children}</div>
    </section>
  );
}
