'use client';

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";
import { cn } from "./utils";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const FONT_HEADER = "var(--font-header)";
const FONT_BASE = "var(--font-base)";
const FONT_MONO = "var(--font-mono)";

export function DatePicker() {
  const today = new Date();
  const [selected, setSelected] = useState<Date | null>(null);
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const prev = () => setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const next = () => setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  const isSelected = (d: number) => selected?.getFullYear() === view.year && selected?.getMonth() === view.month && selected?.getDate() === d;
  const isToday = (d: number) => today.getFullYear() === view.year && today.getMonth() === view.month && today.getDate() === d;

  const label = selected
    ? selected.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "Pick a date";

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ fontFamily: FONT_BASE }}
        className={cn(
          "flex items-center gap-3 border px-3 py-2 text-sm transition-colors min-w-[180px]",
          open ? "border-primary" : "border-border hover:border-primary/50"
        )}
      >
        <Calendar size={14} className={selected ? "text-primary" : "text-muted-foreground"} />
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>{label}</span>
        {selected && (
          <button onClick={e => { e.stopPropagation(); setSelected(null); }} className="ml-auto text-muted-foreground hover:text-foreground">
            <X size={12} />
          </button>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-card border border-border shadow-2xl p-4 w-64">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prev} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <ChevronLeft size={13} />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest text-foreground" style={{ fontFamily: FONT_HEADER }}>
              {MONTHS[view.month]} {view.year}
            </span>
            <button onClick={next} className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="h-7 flex items-center justify-center text-[9px] uppercase tracking-widest text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
              <button
                key={d}
                onClick={() => { setSelected(new Date(view.year, view.month, d)); setOpen(false); }}
                className={cn(
                  "h-7 w-full flex items-center justify-center text-[11px] transition-colors",
                  isSelected(d) ? "bg-primary text-primary-foreground font-bold"
                    : isToday(d) ? "border border-primary text-primary"
                    : "text-foreground hover:bg-secondary"
                )}
                style={{ fontFamily: FONT_MONO }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-border mt-3 pt-3 flex justify-between">
            <button onClick={() => { setSelected(today); setOpen(false); }}
              className="text-[10px] text-primary hover:brightness-90 font-semibold uppercase tracking-widest transition-colors" style={{ fontFamily: FONT_HEADER }}>
              Today
            </button>
            <button onClick={() => setOpen(false)}
              className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors" style={{ fontFamily: FONT_HEADER }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
