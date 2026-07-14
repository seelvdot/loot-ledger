'use client';

import * as React from "react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Bell, X } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ToastItem {
  id: number;
  type: ToastType;
  title: string;
  message?: string;
}

let _toastId = 0;

const TOAST_STATUS: Record<ToastType, string> = {
  success: "success", error: "danger", warning: "warning", info: "info", default: "",
};

const TOAST_ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={15} />, error: <AlertCircle size={15} />,
  warning: <AlertTriangle size={15} />, info: <Info size={15} />, default: <Bell size={15} />,
};

export function ToastDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const add = (type: ToastType, title: string, message?: string) => {
    const id = ++_toastId;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const dismiss = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  const triggerBtns: { type: ToastType; label: string; title: string; msg: string }[] = [
    { type: "success", label: "Success", title: "Deploy successful",      msg: "v1.0.4 is now live in production." },
    { type: "error",   label: "Error",   title: "Build failed",           msg: "Lint error on line 42 in Button.tsx." },
    { type: "warning", label: "Warning", title: "API limit at 82%",       msg: "Consider upgrading your plan." },
    { type: "info",    label: "Info",    title: "New version available",  msg: "Design System v1.1.0 is ready." },
    { type: "default", label: "Default", title: "Reminder",               msg: "Design review at 3:00 PM today." },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {triggerBtns.map(({ type, label, title, msg }) => {
          const s = TOAST_STATUS[type];
          const style: React.CSSProperties = s
            ? { backgroundColor: `var(--status-${s}-bg)`, color: `var(--status-${s})`, borderColor: `var(--status-${s}-border)` }
            : {};
          return (
            <button key={type} onClick={() => add(type, title, msg)}
              style={{ fontFamily: FONT_HEADER, ...style }}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-widest border transition-colors hover:opacity-80 bg-secondary text-foreground border-border"
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Toast stack */}
      {mounted && createPortal(
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
          {toasts.map(t => {
            const s = TOAST_STATUS[t.type];
            const color = s ? `var(--status-${s})` : "var(--foreground)";
            const bar = s ? `var(--status-${s})` : "var(--border)";
            return (
              <div
                key={t.id}
                className="pointer-events-auto flex items-start gap-3 bg-card border border-border shadow-2xl w-80 overflow-hidden"
                style={{ animation: "slideInRight 0.2s ease" }}
              >
                <div className="w-1 self-stretch shrink-0" style={{ backgroundColor: bar }} />
                <div className="mt-3.5 shrink-0" style={{ color }}>{TOAST_ICONS[t.type]}</div>
                <div className="flex-1 py-3 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: FONT_HEADER, color }}>{t.title}</p>
                  {t.message && <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{t.message}</p>}
                </div>
                <button onClick={() => dismiss(t.id)} className="mt-3 mr-3 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>,
        document.body
      )}

      <style>{`@keyframes slideInRight { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }`}</style>
    </div>
  );
}
