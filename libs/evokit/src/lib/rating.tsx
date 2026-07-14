'use client';

import * as React from "react";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "./utils";

const LIME = "oklch(0.87 0.21 128.1)";
const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

export function Rating({ max = 5 }: { max?: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState(3);
  const display = hovered ?? selected;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
        {Array.from({ length: max }, (_, i) => i + 1).map(v => (
          <button
            key={v}
            onMouseEnter={() => setHovered(v)}
            onClick={() => setSelected(v)}
            className="transition-transform hover:scale-110"
          >
            <Star
              size={22}
              fill={v <= display ? LIME : "transparent"}
              stroke={v <= display ? LIME : "oklch(0.45 0 0)"}
              strokeWidth={1.5}
            />
          </button>
        ))}
        <span className="ml-2 text-xs text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{selected}/{max}</span>
      </div>
      <div className="space-y-2 max-w-xs">
        {[
          { label: "Design quality", val: 5 },
          { label: "Documentation", val: 4 },
          { label: "Performance", val: 4 },
          { label: "Accessibility", val: 3 },
        ].map(({ label, val }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground w-28 shrink-0 uppercase tracking-widest" style={{ fontFamily: FONT_HEADER }}>{label}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={12} fill={i < val ? LIME : "transparent"} stroke={i < val ? LIME : "oklch(0.35 0 0)"} strokeWidth={1.5} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
