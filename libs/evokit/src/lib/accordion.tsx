'use client';

import * as React from "react";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const FONT_HEADER = "var(--font-header)";

const ACCORDION_ITEMS = [
  { q: "What are design tokens?", a: "Design tokens are the visual design atoms of the design system — named entities that store visual design attributes such as colors, typography, spacing, and more." },
  { q: "How do I use the color tokens?", a: "Reference them via Tailwind utility classes like bg-background, text-foreground, border-border, or directly as CSS custom properties like var(--primary)." },
  { q: "Is this system accessible?", a: "Yes. All foreground/background token pairings are verified at AA contrast (4.5:1 for body, 3:1 for large text). Interactive states signal with more than color alone." },
  { q: "Can I customize the accent color?", a: "Absolutely. Update --primary and --accent in theme.css and all components that reference bg-primary or text-primary will update automatically." },
];

export function Accordion({ items = ACCORDION_ITEMS }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border border-border divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/30 transition-colors"
          >
            <span className="text-sm font-semibold text-foreground" style={{ fontFamily: FONT_HEADER }}>{item.q}</span>
            {open === i
              ? <ChevronUp size={13} className="text-primary shrink-0" />
              : <ChevronDown size={13} className="text-muted-foreground shrink-0" />}
          </button>
          {open === i && (
            <div className="px-5 pb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
