'use client';

import * as React from "react";
import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { cn } from "./utils";
import { Btn } from "./btn";
import { InputField } from "./input";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

const STEPS = ["Account", "Workspace", "Tokens", "Review"];

export function Stepper() {
  const [step, setStep] = useState(1);
  return (
    <div className="space-y-6">
      {/* Row: squares + lines perfectly center-aligned */}
      <div className="flex items-center">
        {STEPS.map((label, i) => {
          const num = i + 1;
          const done = num < step;
          const active = num === step;
          return (
            <div key={label} className={cn("flex items-center", i < STEPS.length - 1 && "flex-1")}>
              {/* Step button */}
              <button
                onClick={() => setStep(num)}
                className="flex flex-col items-center gap-1.5 group shrink-0"
              >
                <div className={cn(
                  "w-8 h-8 flex items-center justify-center border text-xs font-bold transition-colors",
                  done   ? "bg-primary border-primary text-primary-foreground"
                  : active ? "border-primary text-primary"
                  :         "border-border text-muted-foreground group-hover:border-foreground/30"
                )} style={{ fontFamily: FONT_MONO }}>
                  {done ? <Check size={13} strokeWidth={3} /> : num}
                </div>
                <span
                  className={cn("text-[9px] uppercase tracking-widest hidden sm:block", active ? "text-primary" : "text-muted-foreground")}
                  style={{ fontFamily: FONT_HEADER }}
                >
                  {label}
                </span>
              </button>
              {/* Connector line — only between steps, centered on the square */}
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mx-2 -mt-5", done ? "bg-primary" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>
      <div className="border border-border p-5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-3" style={{ fontFamily: FONT_MONO }}>Step {step} · {STEPS[step - 1]}</p>
        {step === 1 && <div className="grid grid-cols-2 gap-3"><InputField label="Full name" placeholder="Aria Chen" /><InputField label="Email" placeholder="aria@studio.io" /></div>}
        {step === 2 && <div className="grid grid-cols-2 gap-3"><InputField label="Workspace name" placeholder="Studio Alpha" /><InputField label="Slug" placeholder="studio-alpha" /></div>}
        {step === 3 && <div className="space-y-3"><InputField label="API key" placeholder="sk-••••••••" type="password" /><InputField label="Webhook URL" placeholder="https://…" /></div>}
        {step === 4 && <div className="space-y-2 text-sm text-muted-foreground"><p>Review your configuration before creating the workspace.</p><p className="text-primary" style={{ fontFamily: FONT_MONO }}>All fields validated ✓</p></div>}
        <div className="flex gap-3 mt-5">
          {step > 1 && <Btn variant="outline" onClick={() => setStep(s => s - 1)}>Back</Btn>}
          {step < STEPS.length
            ? <Btn onClick={() => setStep(s => s + 1)}>Next</Btn>
            : <Btn icon={<CheckCircle2 size={14} />}>Finish</Btn>}
        </div>
      </div>
    </div>
  );
}
