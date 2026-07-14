'use client';

import * as React from "react";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

export interface SectionProps {
  id: string;
  title: string;
  index?: number | string;
  children: React.ReactNode;
}

export function Section({ id, title, index, children }: SectionProps) {
  const indexStr = typeof index === 'number'
    ? String(index).padStart(2, "0")
    : typeof index === 'string'
      ? index
      : undefined;

  return (
    <section id={id} className="scroll-mt-8 mb-20">
      <div className="flex items-center gap-3 mb-8">
        {indexStr && (
          <span style={{ fontFamily: FONT_MONO }} className="text-[10px] text-muted-foreground tracking-widest uppercase">
            {indexStr}
          </span>
        )}
        <h2 style={{ fontFamily: FONT_HEADER }} className="text-3xl font-bold tracking-widest text-foreground uppercase">
          {title}
        </h2>
        <div className="flex-1 h-px bg-border ml-2" />
      </div>
      {children}
    </section>
  );
}
