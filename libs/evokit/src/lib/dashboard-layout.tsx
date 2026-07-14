'use client';

import * as React from "react";
import { Moon, Sun, ArrowUpRight, Copy } from "lucide-react";
import { Btn } from "./btn";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

// ─── DashboardHeader ──────────────────────────────────────────────────────────
export interface DashboardHeaderProps {
  dark: boolean;
  onToggleDark: () => void;
  title?: string;
}

export function DashboardHeader({ dark, onToggleDark, title = "Design System · v1.0" }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 h-11 border-b border-border bg-background/95 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-primary" />
        <span className="text-[9px] tracking-widest uppercase text-muted-foreground hidden sm:block" style={{ fontFamily: FONT_MONO }}>
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9px] tracking-widest uppercase text-muted-foreground hidden sm:block" style={{ fontFamily: FONT_MONO }}>
          {dark ? "Dark" : "Light"}
        </span>
        <button
          onClick={onToggleDark}
          aria-label="Alternar tema"
          className={cn(
            "relative w-11 h-[22px] rounded-full transition-colors duration-200",
            dark ? "bg-primary" : "bg-secondary border border-border"
          )}
        >
          <div className="absolute inset-0 flex items-center px-[3px]">
            <div className={cn(
              "w-4 h-4 rounded-full bg-background transition-transform duration-200 flex items-center justify-center",
              dark ? "translate-x-[22px]" : "translate-x-0"
            )}>
              {dark ? (
                <Moon size={9} className="text-primary" />
              ) : (
                <Sun size={9} className="text-amber-500" />
              )}
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}

// ─── DashboardSidebar ──────────────────────────────────────────────────────────
export interface DashboardSidebarProps {
  navActive: string;
  onItemClick: (item: string) => void;
  items: readonly string[] | string[];
  title?: React.ReactNode;
  subtitle?: string;
}

export function DashboardSidebar({
  navActive,
  onItemClick,
  items,
  title = <>Design<br />System</>,
  subtitle = "Dark · Lime-400"
}: DashboardSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-52 shrink-0 border-r border-border sticky top-11 h-[calc(100vh-2.75rem)] overflow-y-auto py-8 px-0">
      <div className="px-5 mb-5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-primary" />
          <span className="text-[9px] text-muted-foreground tracking-widest uppercase" style={{ fontFamily: FONT_MONO }}>System</span>
        </div>
        <h1 className="text-xl font-bold tracking-widest uppercase text-foreground leading-tight" style={{ fontFamily: FONT_HEADER }}>
          {title}
        </h1>
        <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-widest" style={{ fontFamily: FONT_MONO }}>{subtitle}</p>
      </div>
      <div className="h-px bg-border mb-2" />
      <nav className="flex flex-col">
        {items.map((item, i) => (
          <button
            key={item}
            onClick={() => onItemClick(item)}
            style={{ fontFamily: FONT_HEADER }}
            className={cn(
              "text-left px-5 py-1.5 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2.5 border-l-2",
              navActive === item
                ? "bg-primary/10 text-primary border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border-transparent"
            )}
          >
            <span className="text-[9px] opacity-30" style={{ fontFamily: FONT_MONO }}>{String(i + 1).padStart(2, "0")}</span>
            {item}
          </button>
        ))}
      </nav>
      <div className="mt-auto px-5 pt-4 border-t border-border">
        <p className="text-[8px] tracking-widest uppercase text-muted-foreground/40" style={{ fontFamily: FONT_MONO }}>v1.0.0 · 2024</p>
      </div>
    </aside>
  );
}

// ─── DashboardHero ────────────────────────────────────────────────────────────
export interface DashboardHeroProps {
  onBrowseClick?: () => void;
  onCopyClick?: () => void;
  tag?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  browseLabel?: string;
  copyLabel?: string;
}

export function DashboardHero({
  onBrowseClick,
  onCopyClick,
  tag = "Design System · v1.0",
  title = <>Dark<br />Foundation<br /><span className="text-primary">Precision.</span></>,
  description = "37 components. Zero border radius. Rajdhani headers, Inter body, DM Mono labels, and lime-400 accent throughout.",
  browseLabel = "Browse system",
  copyLabel = "Copy tokens"
}: DashboardHeroProps) {
  return (
    <div className="mb-16 border-b border-border pb-12">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-primary" />
        <span className="text-[9px] text-muted-foreground tracking-widest uppercase" style={{ fontFamily: FONT_MONO }}>
          {tag}
        </span>
      </div>
      <h1 className="text-6xl lg:text-7xl font-bold leading-[0.95] mb-5 uppercase tracking-tight" style={{ fontFamily: FONT_HEADER }}>
        {title}
      </h1>
      <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
        {description}
      </p>
      <div className="flex gap-3 mt-6">
        <Btn icon={<ArrowUpRight size={14} />} onClick={onBrowseClick}>
          {browseLabel}
        </Btn>
        <Btn variant="outline" icon={<Copy size={14} />} onClick={onCopyClick}>
          {copyLabel}
        </Btn>
      </div>
    </div>
  );
}
