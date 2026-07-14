import * as React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_BASE = "var(--font-base)";

export type LinkVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type LinkSize = "sm" | "md" | "lg" | "icon";

export function LinkBtn({
  variant = "primary", size = "md", children, icon, href = "#", external, className,
}: {
  variant?: LinkVariant; size?: LinkSize; children?: React.ReactNode;
  icon?: React.ReactNode; href?: string; external?: boolean; className?: string;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background select-none uppercase";
  const sizes: Record<LinkSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "w-9 h-9 text-sm",
  };
  const variants: Record<LinkVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:brightness-90 active:scale-[0.98]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
    outline: "border border-border text-foreground hover:bg-secondary active:scale-[0.98]",
    ghost: "text-foreground hover:bg-secondary active:scale-[0.98]",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 active:scale-[0.98]",
  };
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(base, sizes[size], variants[variant], className)}
      style={{ fontFamily: FONT_HEADER }}
    >
      {icon}
      {children}
      {external && <ExternalLink size={11} className="opacity-60" />}
    </a>
  );
}

export function TextLink({
  href = "#", children, external, muted,
}: {
  href?: string; children: React.ReactNode; external?: boolean; muted?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-1 underline underline-offset-3 decoration-1 transition-colors",
        muted
          ? "text-muted-foreground hover:text-foreground decoration-muted-foreground/40 hover:decoration-foreground"
          : "text-primary hover:brightness-90 decoration-primary/40 hover:decoration-primary"
      )}
      style={{ fontFamily: FONT_BASE }}
    >
      {children}
      {external && <ExternalLink size={10} className="opacity-50" />}
    </a>
  );
}
