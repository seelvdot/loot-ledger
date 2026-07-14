import * as React from "react";
import { Plus } from "lucide-react";
import { Btn } from "./btn";

const FONT_HEADER = "var(--font-header)";

export function EmptyStateCard({ icon, title, desc, action, onAction }: {
  icon: React.ReactNode; title: string; desc: string; action: string; onAction?: () => void;
}) {
  return (
    <div className="border border-border border-dashed p-10 flex flex-col items-center text-center gap-3">
      {icon}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-foreground" style={{ fontFamily: FONT_HEADER }}>{title}</p>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">{desc}</p>
      </div>
      <Btn size="sm" icon={<Plus size={12} />} onClick={onAction}>{action}</Btn>
    </div>
  );
}
