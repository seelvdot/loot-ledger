import * as React from "react";
import { cn } from "./utils";

const FONT_MONO = "var(--font-mono)";

export function Divider({ label, align = "center" }: { label?: string; align?: "left" | "center" | "right" }) {
  if (!label) return <div className="h-px bg-border w-full" />;
  const alignCls = { left: "justify-start", center: "justify-center", right: "justify-end" };
  return (
    <div className="flex items-center gap-3">
      {align !== "left" && <div className="flex-1 h-px bg-border" />}
      <span
        className="text-[9px] uppercase tracking-widest text-muted-foreground/60 px-1 shrink-0"
        style={{ fontFamily: FONT_MONO }}
      >
        {label}
      </span>
      {align !== "right" && <div className="flex-1 h-px bg-border" />}
    </div>
  );
}
