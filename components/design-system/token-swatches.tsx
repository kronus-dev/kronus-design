"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TokenGroup = { title: string; tokens: { name: string; note?: string }[] };

/** Colour swatches for CSS variables, showing each token's live value from app/globals.css. */
export function TokenSwatches({ groups }: { groups: TokenGroup[] }) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const read: Record<string, string> = {};
    for (const g of groups) for (const t of g.tokens) read[t.name] = style.getPropertyValue(`--${t.name}`).trim();
    // Reads the stylesheet once on mount; the values never change at runtime.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues(read);
  }, [groups]);

  return (
    <div className="grid gap-8">
      {groups.map((group) => (
        <div key={group.title}>
          <h4 className="mb-3 text-sm font-semibold text-white">{group.title}</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {group.tokens.map((t) => (
              <div key={t.name} className="min-w-0">
                <div
                  className={cn("h-14 rounded-lg ring-1 ring-white/10")}
                  style={{ background: `var(--${t.name})` }}
                  aria-hidden
                />
                <div className="mt-2 truncate font-mono text-xs text-white">--{t.name}</div>
                <div className="truncate font-mono text-[11px] text-muted-foreground">{values[t.name] || "…"}</div>
                {t.note && <div className="text-[11px] text-muted-foreground">{t.note}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
