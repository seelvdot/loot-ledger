import * as React from "react";
import { cn } from "./utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border border-border bg-card p-5", className)}>{children}</div>;
}
