'use client';

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Copy, User, Settings, Bell, X, Download, ArrowUpRight, Trash2, Globe, Link } from "lucide-react";
import { cn } from "./utils";

const LIME = "oklch(0.87 0.21 128.1)";
const FONT_HEADER = "var(--font-header)";
const FONT_BASE = "var(--font-base)";
const FONT_MONO = "var(--font-mono)";

export function PopoverDemo() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const popovers = [
    {
      id: "info",
      label: "Token info",
      content: (
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: FONT_MONO }}>--primary</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 shrink-0" style={{ backgroundColor: LIME }} />
            <div>
              <p className="text-xs font-bold text-foreground" style={{ fontFamily: FONT_HEADER }}>Lime 400</p>
              <p className="text-[10px] text-muted-foreground" style={{ fontFamily: FONT_MONO }}>oklch(0.87 0.21 128.1)</p>
              <p className="text-[10px] text-muted-foreground" style={{ fontFamily: FONT_MONO }}>#a3e635</p>
            </div>
          </div>
          <button onClick={() => { navigator.clipboard.writeText("oklch(0.87 0.21 128.1)"); setOpen(null); }}
            className="w-full flex items-center gap-2 text-[10px] text-muted-foreground hover:text-primary transition-colors" style={{ fontFamily: FONT_MONO }}>
            <Copy size={10} /> Copy value
          </button>
        </div>
      ),
    },
    {
      id: "user",
      label: "User card",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center text-sm font-bold shrink-0" style={{ backgroundColor: LIME, color: "oklch(0.13 0 0)", fontFamily: FONT_HEADER }}>AC</div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground" style={{ fontFamily: FONT_HEADER }}>Aria Chen</p>
              <p className="text-[10px] text-muted-foreground">Design Lead · aria@studio.io</p>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex gap-2">
            <button className="flex-1 text-[10px] font-semibold uppercase tracking-widest text-foreground border border-border px-2 py-1.5 hover:bg-secondary transition-colors" style={{ fontFamily: FONT_HEADER }}>Message</button>
            <button className="flex-1 text-[10px] font-semibold uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1.5 hover:brightness-90 transition-all" style={{ fontFamily: FONT_HEADER }}>Profile</button>
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      label: "Quick actions",
      content: (
        <div className="space-y-0.5">
          {[
            { icon: <Copy size={12} />, label: "Duplicate component" },
            { icon: <Download size={12} />, label: "Export as JSON" },
            { icon: <ArrowUpRight size={12} />, label: "Open in Figma" },
            { icon: <Trash2 size={12} />, label: "Delete", danger: true },
          ].map(item => (
            <button key={item.label} onClick={() => setOpen(null)}
              className={cn("w-full flex items-center gap-2.5 px-2 py-2 text-[11px] transition-colors text-left", item.danger ? "text-rose-400 hover:bg-rose-400/10" : "text-foreground hover:bg-secondary")}
              style={{ fontFamily: FONT_BASE }}>
              {item.icon}{item.label}
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap gap-4" ref={ref}>
      {popovers.map(p => (
        <div key={p.id} className="relative">
          <button
            onClick={() => setOpen(open === p.id ? null : p.id)}
            style={{ fontFamily: FONT_HEADER }}
            className={cn(
              "px-4 py-2 text-xs font-semibold uppercase tracking-widest border transition-colors",
              open === p.id ? "border-primary text-primary bg-primary/5" : "border-border text-foreground hover:bg-secondary"
            )}
          >
            {p.label}
            <ChevronDown size={11} className={cn("inline ml-1.5 transition-transform", open === p.id && "rotate-180")} />
          </button>
          {open === p.id && (
            <div className="absolute left-0 top-full mt-1.5 z-50 bg-card border border-border shadow-2xl p-4 w-56">
              {p.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export { PopoverDemo as Popover };
