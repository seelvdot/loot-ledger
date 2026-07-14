'use client';

import * as React from "react";

const FONT_MONO = "var(--font-mono)";

export interface SpacingRowProps {
  label: string;
  px: number;
}

export function SpacingRow({ label, px }: SpacingRowProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] text-muted-foreground w-16 shrink-0 tracking-widest" style={{ fontFamily: FONT_MONO }}>{label}</span>
      <div className="bg-primary/20 border-l-2 border-primary" style={{ height: 16, width: px }} />
      <span className="text-[10px] text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{px}px</span>
    </div>
  );
}
