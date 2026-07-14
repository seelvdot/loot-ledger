'use client';

import * as React from "react";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

const CODE_SAMPLES = {
  tokens: `/* theme.css */
:root {
  --background: oklch(0.13 0 0);
  --primary:    oklch(0.87 0.21 128.1);  /* lime-400 */
  --border:     oklch(0.26 0 0);
  --radius:     0rem;
}`,
  component: `// Button.tsx
function Btn({ variant = "primary", children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(base, variants[variant])}
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
    >
      {children}
    </button>
  );
}`,
  usage: `import { Btn, Badge, Card } from "@ds/components";

export function Dashboard() {
  return (
    <Card>
      <Badge variant="success">Live</Badge>
      <Btn onClick={deploy}>Deploy v1.0.4</Btn>
    </Card>
  );
}`,
};

export function Code({ tabs = CODE_SAMPLES }: { tabs?: Record<string, string> }) {
  const keys = Object.keys(tabs);
  const [tab, setTab] = useState(keys[0]);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(tabs[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="border border-border overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-2">
        <div className="flex">
          {keys.map(k => (
            <button key={k} onClick={() => setTab(k)}
              className={cn("px-3 py-1 text-[10px] font-semibold uppercase tracking-widest transition-colors", tab === k ? "text-primary" : "text-muted-foreground hover:text-foreground")}
              style={{ fontFamily: FONT_HEADER }}>
              {k}
            </button>
          ))}
        </div>
        <button onClick={copy} className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors" style={{ fontFamily: FONT_MONO }}>
          {copied ? <><Check size={11} className="text-primary" />Copied</> : <><Copy size={11} />Copy</>}
        </button>
      </div>
      <pre className="px-5 py-4 text-xs leading-relaxed overflow-x-auto"
        style={{ fontFamily: FONT_MONO, background: "var(--code-bg)", color: "var(--code-fg)" }}>
        <code>{tabs[tab]}</code>
      </pre>
    </div>
  );
}

export function CodeBlock() {
  return <Code tabs={CODE_SAMPLES} />;
}
