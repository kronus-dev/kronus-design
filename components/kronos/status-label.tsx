import { cn } from "@/lib/utils";
import { statusClass, type Status } from "@/lib/data";

/** A process status in its colour: greens = going well, yellow = waiting, orange = needs action, grey = closed. */
export function StatusLabel({ status, className, ...props }: React.ComponentProps<"span"> & { status: Status | string }) {
  return (
    <span data-slot="status-label" className={cn("font-medium", statusClass(status), className)} {...props}>
      {status}
    </span>
  );
}
