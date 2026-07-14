'use client';

import * as React from "react";
import { useState } from "react";
import {
  Home, BarChart2, FileText, Upload, Settings, Code2, Terminal, Search
} from "lucide-react";
import { cn } from "./utils";

const FONT_BASE = "var(--font-base)";
const FONT_MONO = "var(--font-mono)";

export interface CommandItem {
  icon: React.ReactNode;
  label: string;
  shortcut: string;
  group: string;
}

export const CMD_ITEMS: CommandItem[] = [
  { icon: <Home size={13} />, label: "Go to dashboard", shortcut: "G D", group: "Navigation" },
  { icon: <BarChart2 size={13} />, label: "Open analytics", shortcut: "G A", group: "Navigation" },
  { icon: <FileText size={13} />, label: "New document", shortcut: "⌘ N", group: "Actions" },
  { icon: <Upload size={13} />, label: "Upload asset", shortcut: "⌘ U", group: "Actions" },
  { icon: <Settings size={13} />, label: "Preferences", shortcut: "⌘ ,", group: "Actions" },
  { icon: <Code2 size={13} />, label: "View source", shortcut: "⌘ ⇧ S", group: "Developer" },
  { icon: <Terminal size={13} />, label: "Open terminal", shortcut: "⌘ `", group: "Developer" },
];

export function CommandPalette({ items = CMD_ITEMS }: { items?: CommandItem[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const filtered = items.filter(i => i.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <Search size={13} className="text-muted-foreground shrink-0" />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(0); }}
          placeholder="Search commands…"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          style={{ fontFamily: FONT_BASE }}
        />
        <kbd className="text-[9px] text-muted-foreground border border-border px-1.5 py-0.5" style={{ fontFamily: FONT_MONO }}>ESC</kbd>
      </div>
      {filtered.length === 0 ? (
        <p className="px-4 py-6 text-sm text-muted-foreground text-center">No commands found.</p>
      ) : (
        <div>
          {filtered.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setSelected(i)}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 cursor-pointer transition-colors",
                selected === i ? "bg-secondary/60 text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={selected === i ? "text-primary" : ""}>{item.icon}</span>
                <span className="text-sm" style={{ fontFamily: FONT_BASE }}>{item.label}</span>
                <span className="text-[9px] text-muted-foreground/50 uppercase tracking-widest hidden sm:block" style={{ fontFamily: FONT_MONO }}>{item.group}</span>
              </div>
              <kbd className="text-[9px] border border-border px-1.5 py-0.5 text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{item.shortcut}</kbd>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
