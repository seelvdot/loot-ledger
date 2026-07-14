'use client';

import * as React from "react";
import { useState } from "react";
import { CheckCircle2, AlertCircle, User, Star, Bell, X } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

const NOTIFS = [
  { icon: <CheckCircle2 size={14} />, color: "text-green-400", title: "Deploy succeeded", sub: "v1.0.4 is live in production", time: "2m ago", unread: true },
  { icon: <AlertCircle size={14} />, color: "text-rose-400", title: "Build failed", sub: "main → lint error on line 42", time: "14m ago", unread: true },
  { icon: <User size={14} />, color: "text-sky-400", title: "Sela invited you", sub: "Workspace: Studio Alpha", time: "1h ago", unread: false },
  { icon: <Star size={14} />, color: "text-amber-400", title: "Component starred", sub: "Aria Chen starred <Modal />", time: "3h ago", unread: false },
  { icon: <Bell size={14} />, color: "text-violet-400", title: "Reminder", sub: "Design review at 3:00 PM today", time: "5h ago", unread: false },
];

export function NotificationFeed() {
  const [items, setItems] = useState(NOTIFS);
  const dismiss = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));
  const markAll = () => setItems(prev => prev.map(n => ({ ...n, unread: false })));
  return (
    <div className="border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/30">
        <span className="text-xs font-bold uppercase tracking-widest text-foreground" style={{ fontFamily: FONT_HEADER }}>
          Notifications
          {items.filter(n => n.unread).length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-primary text-primary-foreground" style={{ fontFamily: FONT_MONO }}>
              {items.filter(n => n.unread).length}
            </span>
          )}
        </span>
        <button onClick={markAll} className="text-[10px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest" style={{ fontFamily: FONT_HEADER }}>
          Mark all read
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">All caught up!</p>
      ) : (
        <div className="divide-y divide-border">
          {items.map((n, i) => (
            <div key={i} className={cn("flex gap-3 px-4 py-3.5 hover:bg-secondary/20 transition-colors group", n.unread && "bg-secondary/10")}>
              <div className={cn("mt-0.5 shrink-0", n.color)}>{n.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-foreground">{n.title}</p>
                  {n.unread && <div className="w-1.5 h-1.5 bg-primary shrink-0" />}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{n.sub}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[9px] text-muted-foreground/60" style={{ fontFamily: FONT_MONO }}>{n.time}</span>
                <button onClick={() => dismiss(i)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all">
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
