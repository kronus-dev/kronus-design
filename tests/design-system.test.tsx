import { readdirSync } from "node:fs";
import { join } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { EXAMPLES } from "@/components/design-system/example-loaders";
import { CATEGORIES, COMPONENTS } from "@/components/design-system/registry";
import { AppShell } from "@/components/kronos/app-shell";
import { StatCard } from "@/components/kronos/stat-card";
import { StatusLabel } from "@/components/kronos/status-label";
import { TooltipProvider } from "@/components/ui/tooltip";

vi.mock("next/navigation", () => ({ usePathname: () => "/design-system/" }));

const root = join(__dirname, "..");
const uiFiles = readdirSync(join(root, "components/ui")).map((f) => f.replace(/\.tsx$/, ""));

describe("design system catalogue", () => {
  it("lists every component in components/ui exactly once", () => {
    const slugs = COMPONENTS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect([...slugs].sort()).toEqual([...uiFiles].sort());
  });

  it("has a demo and a known category for every component", () => {
    for (const c of COMPONENTS) {
      expect(EXAMPLES[c.slug], c.slug).toBeTypeOf("function");
      expect(CATEGORIES).toContain(c.category);
      expect(c.description.length, c.slug).toBeGreaterThan(10);
    }
  });
});

describe("Kronos components", () => {
  it("StatCard colours the change by trend", () => {
    const { rerender } = render(<StatCard label="Out this week" value="9" delta="+2" trend="down" />);
    expect(screen.getByText("+2")).toHaveClass("text-destructive");
    rerender(<StatCard label="Active employees" value="148" delta="+2.8%" trend="up" />);
    expect(screen.getByText("+2.8%")).toHaveClass("text-success");
  });

  it("StatusLabel uses the status colour tokens", () => {
    render(<StatusLabel status="Under evaluation" />);
    expect(screen.getByText("Under evaluation")).toHaveClass("text-warning");
  });
});

describe("side menu", () => {
  it("ends with Design system, marked current on its page", () => {
    render(
      <TooltipProvider>
        <AppShell>content</AppShell>
      </TooltipProvider>,
    );
    const nav = screen.getByRole("navigation", { name: "Main" });
    const link = within(nav).getByRole("link", { name: "Design system" });
    expect(link).toHaveAttribute("href", "/design-system");
    expect(link).toHaveAttribute("aria-current", "page");

    const links = within(nav).getAllByRole("link");
    expect(links.at(-1)).toBe(link);
    expect(within(nav).getByRole("link", { name: "Dashboard" })).not.toHaveAttribute("aria-current");
  });
});
