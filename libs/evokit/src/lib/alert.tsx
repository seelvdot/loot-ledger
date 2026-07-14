import * as React from "react";
import { Info, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

const FONT_HEADER = "var(--font-header)";

export function Alert({ variant, title, message }: { variant: "info" | "success" | "warning" | "danger"; title: string; message: string }) {
  const icons = {
    info: <Info size={15} />, success: <CheckCircle2 size={15} />,
    warning: <AlertTriangle size={15} />, danger: <AlertCircle size={15} />,
  };
  const key = { info: "info", success: "success", warning: "warning", danger: "danger" }[variant];
  const containerStyle: React.CSSProperties = {
    backgroundColor: `var(--status-${key}-bg)`,
    borderColor: `var(--status-${key}-border)`,
  };
  const textStyle: React.CSSProperties = { color: `var(--status-${key})` };
  return (
    <div className="border p-4 flex gap-3" style={containerStyle}>
      <div className="mt-0.5 shrink-0" style={textStyle}>{icons[variant]}</div>
      <div>
        <p className="text-sm font-bold uppercase tracking-wide" style={{ fontFamily: FONT_HEADER, ...textStyle }}>{title}</p>
        <p className="text-xs mt-0.5" style={{ color: `var(--status-${key})`, opacity: 0.8 }}>{message}</p>
      </div>
    </div>
  );
}
