'use client';

import * as React from "react";
import { useState } from "react";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

export interface SwatchProps {
  name: string;
  value: string;
  text: string;
  token: string;
  activeColor?: string;
}

export function Swatch({ name, value, text, token, activeColor = "var(--primary)" }: SwatchProps) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="overflow-hidden border border-border cursor-pointer group"
      onClick={() => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
    >
      <div className="h-14 w-full group-hover:opacity-90 transition-opacity" style={{ backgroundColor: value }} />
      <div className="px-3 py-2.5 bg-card">
        <p className="text-xs font-semibold text-foreground" style={{ fontFamily: FONT_HEADER }}>{name}</p>
        <p className="text-[10px] text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{token}</p>
        <p className="text-[10px] mt-0.5" style={{ color: copied ? activeColor : undefined, fontFamily: FONT_MONO }}>
          {copied ? "Copied!" : text}
        </p>
      </div>
    </div>
  );
}
