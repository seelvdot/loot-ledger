import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="text-muted-foreground/40" />}
          <span
            className={cn(
              "text-xs uppercase tracking-widest",
              i === items.length - 1
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            )}
            style={{ fontFamily: FONT_HEADER }}
          >
            {item.href ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              item.label
            )}
          </span>
        </span>
      ))}
    </nav>
  );
}
