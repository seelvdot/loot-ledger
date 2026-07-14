import * as React from "react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";

export function Badge({ variant, children }: {
  variant: "default" | "outline" | "success" | "warning" | "danger" | "info";
  children: React.ReactNode;
}) {
  const base = "inline-flex items-center gap-1 text-[10px] font-semibold tracking-widest px-2.5 py-0.5 uppercase";
  const staticVariants: Record<string, string> = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-border text-foreground",
  };
  const statusStyle: Record<string, React.CSSProperties> = {
    success: { backgroundColor: "var(--status-success-bg)", color: "var(--status-success)", border: "1px solid var(--status-success-border)" },
    warning: { backgroundColor: "var(--status-warning-bg)", color: "var(--status-warning)", border: "1px solid var(--status-warning-border)" },
    danger:  { backgroundColor: "var(--status-danger-bg)",  color: "var(--status-danger)",  border: "1px solid var(--status-danger-border)"  },
    info:    { backgroundColor: "var(--status-info-bg)",     color: "var(--status-info)",    border: "1px solid var(--status-info-border)"    },
  };
  return (
    <span
      className={cn(base, staticVariants[variant])}
      style={{ fontFamily: FONT_HEADER, ...(statusStyle[variant] ?? {}) }}
    >
      {children}
    </span>
  );
}
