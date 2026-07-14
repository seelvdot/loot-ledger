'use client';

import * as React from "react";
import { useState } from "react";
import { Copy, ArrowUpRight, Settings, Trash2, Download } from "lucide-react";
import { cn } from "./utils";

const FONT_BASE = "var(--font-base)";

interface TooltipProps {
  label: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ label, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={className}
      >
        {children}
      </div>
      {visible && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-foreground text-background text-[11px] font-medium whitespace-nowrap pointer-events-none z-10"
          style={{ fontFamily: FONT_BASE }}
        >
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
        </div>
      )}
    </div>
  );
}

export function TooltipDemo() {
  const [visible, setVisible] = useState<string | null>(null);
  const items = [
    { key: "copy", label: "Copy to clipboard", icon: <Copy size={15} /> },
    { key: "share", label: "Share link", icon: <ArrowUpRight size={15} /> },
    { key: "settings", label: "Open settings", icon: <Settings size={15} /> },
    { key: "delete", label: "Delete item", icon: <Trash2 size={15} /> },
    { key: "download", label: "Download", icon: <Download size={15} /> },
  ];
  return (
    <div className="flex gap-2">
      {items.map(({ key, label, icon }) => (
        <div key={key} className="relative">
          <button
            onMouseEnter={() => setVisible(key)}
            onMouseLeave={() => setVisible(null)}
            className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            {icon}
          </button>
          {visible === key && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-foreground text-background text-[11px] font-medium whitespace-nowrap pointer-events-none z-10" style={{ fontFamily: FONT_BASE }}>
              {label}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
