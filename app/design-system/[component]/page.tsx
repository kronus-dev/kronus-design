import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";

import { EXAMPLES } from "@/components/design-system/example-loaders";
import { COMPONENTS, docsUrl, getComponent } from "@/components/design-system/registry";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

// Static export: one page per component, nothing else.
export const dynamicParams = false;

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ component: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/design-system/[component]">): Promise<Metadata> {
  const entry = getComponent((await params).component);
  return { title: entry ? `${entry.title} · Design system` : "Design system" };
}

export default async function ComponentPage({ params }: PageProps<"/design-system/[component]">) {
  const { component } = await params;
  const entry = getComponent(component);
  if (!entry) notFound();

  const { default: Demo } = await EXAMPLES[entry.slug]();
  const index = COMPONENTS.indexOf(entry);
  const prev = COMPONENTS[index - 1];
  const next = COMPONENTS[index + 1];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/design-system" />}>Design system</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/design-system#library" />}>{entry.category}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{entry.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="flex flex-col gap-3 rounded-lg bg-card p-5 sm:p-8">
        <h1 className="text-[26px] font-bold tracking-tight text-white sm:text-4xl">{entry.title}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{entry.description}</p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-foreground">components/ui/{entry.slug}.tsx</code>
          <Button variant="outline" size="sm" render={<a href={docsUrl(entry.slug)} target="_blank" rel="noreferrer" />} nativeButton={false}>
            shadcn/ui docs
            <ExternalLinkIcon data-icon="inline-end" />
          </Button>
        </div>
      </header>

      <Demo />

      <nav aria-label="Other components" className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
        {prev ? (
          <Button variant="ghost" render={<Link href={`/design-system/${prev.slug}`} />} nativeButton={false}>
            <ArrowLeftIcon data-icon="inline-start" />
            {prev.title}
          </Button>
        ) : (
          <span />
        )}
        {next && (
          <Button variant="ghost" render={<Link href={`/design-system/${next.slug}`} />} nativeButton={false}>
            {next.title}
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        )}
      </nav>
    </div>
  );
}
