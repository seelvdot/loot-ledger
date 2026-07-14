'use client';

import * as React from "react";
import { useState } from "react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";

export function Tabs({ tabs, children }: { tabs: string[]; children: (active: string) => React.ReactNode }) {
  const [active, setActive] = useState(tabs[0]);
  return (
    <div>
      <div className="flex border-b border-border">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            style={{ fontFamily: FONT_HEADER }}
            className={cn(
              "px-5 py-2.5 text-sm font-bold uppercase tracking-widest transition-colors border-b-2 -mb-px",
              active === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="pt-5">{children(active)}</div>
    </div>
  );
}
