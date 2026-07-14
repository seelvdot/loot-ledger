'use client';

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_BASE = "var(--font-base)";

export interface DropdownProps {
  trigger: React.ReactNode;
  align?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export function Dropdown({ trigger, align = "left", children, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className={cn("relative inline-block", className)} ref={ref}>
      <div onClick={() => setOpen(o => !o)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <>
          <div className="absolute mt-1 w-48 bg-card border border-border shadow-2xl z-50 transition-all duration-150"
               style={{ right: align === "right" ? 0 : "auto", left: align === "left" ? 0 : "auto" }}
               onClick={() => setOpen(false)}>
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  className?: string;
}

export function DropdownItem({ children, onClick, danger, className }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors text-left font-space-grotesk uppercase cursor-pointer",
        danger ? "text-rose-400 hover:bg-rose-400/10" : "text-foreground hover:bg-secondary",
        className
      )}
      style={{ fontFamily: FONT_BASE }}
      type="button"
    >
      {children}
    </button>
  );
}

export function DropdownLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div 
      className={cn("font-space-grotesk uppercase text-xs text-muted-foreground p-2 font-medium pb-2 border-b border-border mb-1", className)}
      style={{ fontFamily: FONT_HEADER }}
    >
      {children}
    </div>
  );
}

export function DropdownDivider() {
  return <div className="h-px bg-border my-1" />;
}
