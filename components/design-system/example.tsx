// Frames for the official shadcn examples, matching their API (`Example`, `ExampleWrapper`)
// but sized for a page inside the Kronos layout instead of a full-screen preview.
import { cn } from "@/lib/utils";

export function ExampleWrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="example-wrapper"
      className={cn("grid w-full min-w-0 items-start gap-6 md:grid-cols-2", className)}
      {...props}
    />
  );
}

export function Example({
  title,
  children,
  className,
  containerClassName,
  ...props
}: React.ComponentProps<"div"> & { title?: string; containerClassName?: string }) {
  return (
    <div data-slot="example" className={cn("flex w-full min-w-0 flex-col gap-1 self-stretch", containerClassName)} {...props}>
      {title && <div className="px-1 py-2 text-xs font-medium text-muted-foreground">{title}</div>}
      <div
        data-slot="example-content"
        className={cn(
          "flex min-w-0 flex-1 flex-col items-start gap-6 rounded-lg border border-border bg-card p-6 text-card-foreground sm:p-10 *:[div:not([class*='w-'])]:w-full",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
