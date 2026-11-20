import { cn } from "@/lib/utils";

/** Title and one-line description above a page section. */
export function SectionHeading({
  title,
  description,
  as: Heading = "h2",
  className,
}: {
  title: string;
  description?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div data-slot="section-heading" className={cn("-mb-2", className)}>
      <Heading className="text-xl font-bold text-white">{title}</Heading>
      {description && <p className="mt-1.5 text-[13px] text-muted-foreground">{description}</p>}
    </div>
  );
}
