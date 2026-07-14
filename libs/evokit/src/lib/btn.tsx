'use client';

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";

export type BtnVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type BtnSize = "sm" | "md" | "lg" | "icon";

export interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function Btn({
  variant = "primary",
  size = "md",
  children,
  disabled,
  icon,
  loading,
  onClick,
  type = "button",
  className,
  ...props
}: BtnProps) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40 disabled:pointer-events-none select-none uppercase cursor-pointer";
  const sizes: Record<BtnSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "w-9 h-9 text-sm",
  };
  const variants: Record<BtnVariant, string> = {
    primary: "bg-primary/85 text-primary-foreground hover:brightness-90 active:scale-[0.98] dark:bg-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
    outline: "border border-border text-foreground hover:bg-secondary active:scale-[0.98]",
    ghost: "text-foreground hover:bg-secondary active:scale-[0.98]",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 active:scale-[0.98]",
  };
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(base, sizes[size], variants[variant], className)}
      style={{ fontFamily: FONT_HEADER }}
      {...props}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}

// Export as Button too for compatibility
export { Btn as Button };
