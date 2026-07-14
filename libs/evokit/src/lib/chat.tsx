'use client';

import * as React from "react";
import { useState, useRef } from "react";
import { Paperclip, Smile, Send, X } from "lucide-react";
import { cn } from "./utils";

const LIME = "oklch(0.87 0.21 128.1)";
const FONT_HEADER = "var(--font-header)";
const FONT_BASE = "var(--font-base)";
const FONT_MONO = "var(--font-mono)";

const INIT_MESSAGES = [
  { from: "AC", text: "Hey, the new design tokens look great!", mine: false, time: "09:12" },
  { from: "Me", text: "Thanks! I updated the lime accent and zeroed out all radius values.", mine: true, time: "09:13" },
  { from: "AC", text: "Zero radius is a bold call. Feels really precise though 👌", mine: false, time: "09:14" },
  { from: "Me", text: "Exactly the vibe — sharp edges, technical feel. Matches Rajdhani headers perfectly.", mine: true, time: "09:15" },
];

export function Chat() {
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: "Me", text: input.trim(), mine: true, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }) }]);
    setInput("");
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="border border-border overflow-hidden flex flex-col" style={{ height: 340 }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/30">
        <div className="w-7 h-7 flex items-center justify-center text-xs font-bold" style={{ backgroundColor: LIME, color: "oklch(0.13 0 0)", fontFamily: FONT_HEADER }}>AC</div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground" style={{ fontFamily: FONT_HEADER }}>Aria Chen</p>
          <p className="text-[9px] text-green-400 flex items-center gap-1" style={{ fontFamily: FONT_MONO }}><span className="w-1.5 h-1.5 bg-green-400 inline-block" />Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-2", m.mine && "flex-row-reverse")}>
            {!m.mine && (
              <div className="w-6 h-6 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5" style={{ backgroundColor: LIME, color: "oklch(0.13 0 0)", fontFamily: FONT_HEADER }}>{m.from}</div>
            )}
            <div className={cn("max-w-[70%] px-3 py-2 text-xs", m.mine ? "bg-primary/15 border border-primary/25 text-foreground" : "bg-secondary border border-border text-foreground")}>
              <p>{m.text}</p>
              <p className="text-[9px] text-muted-foreground mt-1 text-right" style={{ fontFamily: FONT_MONO }}>{m.time}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="border-t border-border px-3 py-2.5 flex gap-2 bg-secondary/10">
        <button className="text-muted-foreground hover:text-foreground transition-colors"><Paperclip size={14} /></button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Send a message…"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          style={{ fontFamily: FONT_BASE }}
        />
        <button className="text-muted-foreground hover:text-foreground transition-colors"><Smile size={14} /></button>
        <button
          onClick={send}
          className="w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground hover:brightness-90 transition-all"
        >
          <Send size={12} />
        </button>
      </div>
    </div>
  );
}
