import * as React from "react";
import { cn } from "./utils";

const LIME = "oklch(0.87 0.21 128.1)";
const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

export function Progress({ value, label, color }: { value: number; label: string; color?: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-semibold text-foreground uppercase tracking-widest" style={{ fontFamily: FONT_HEADER }}>{label}</span>
        <span className="text-[10px] text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-secondary w-full overflow-hidden">
        <div className="h-full" style={{ width: `${value}%`, backgroundColor: color || LIME }} />
      </div>
    </div>
  );
}
