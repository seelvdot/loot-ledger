'use client';

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";

const LIME = "oklch(0.87 0.21 128.1)";

export const AVATARS = [
  { initials: "AC", name: "Aria Chen", role: "Design Lead", color: LIME, textColor: "oklch(0.13 0 0)" },
  { initials: "MW", name: "Marcus Webb", role: "Engineer", color: "oklch(0.7 0.15 200)", textColor: "#fff" },
  { initials: "SN", name: "Sela Noboa", role: "PM", color: "oklch(0.65 0.2 300)", textColor: "#fff" },
  { initials: "TH", name: "Tom Haruki", role: "Engineer", color: "oklch(0.75 0.18 60)", textColor: "#000" },
  { initials: "PM", name: "Priya Menon", role: "Design", color: "oklch(0.6 0.19 25)", textColor: "#fff" },
];

export interface AvatarProps {
  initials: string;
  color?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ initials, color = LIME, textColor = "oklch(0.13 0 0)", size = "md", className }: AvatarProps) {
  const sizeClasses = {
    sm: "w-7 h-7 text-[10px]",
    md: "w-8 h-8 text-xs",
    lg: "w-9 h-9 text-sm",
  };
  return (
    <div
      className={cn(
        "flex items-center justify-center font-bold select-none shrink-0",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: color, color: textColor, fontFamily: FONT_HEADER }}
    >
      {initials}
    </div>
  );
}

export function AvatarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex -space-x-2", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<AvatarProps>(child)) {
          return React.cloneElement(child, {
            className: cn(child.props.className, "border-2 border-background"),
          });
        }
        return child;
      })}
    </div>
  );
}

export interface AvatarRowProps {
  initials: string;
  name: string;
  role: string;
  color?: string;
  textColor?: string;
  onClick?: () => void;
}

export function AvatarRow({ initials, name, role, color, textColor, onClick }: AvatarRowProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 border border-border px-4 py-2.5 hover:bg-secondary/20 transition-colors",
        onClick && "cursor-pointer"
      )}
    >
      <Avatar initials={initials} color={color} textColor={textColor} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-foreground uppercase tracking-wide" style={{ fontFamily: FONT_HEADER }}>
          {name}
        </p>
        <p className="text-[10px] text-muted-foreground">{role}</p>
      </div>
      <ChevronRight size={12} className="text-muted-foreground" />
    </div>
  );
}

export function AvatarDemo() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        {AVATARS.map(({ initials, color, textColor }) => (
          <Avatar key={initials} initials={initials} color={color} textColor={textColor} size="lg" />
        ))}
        <AvatarGroup>
          {AVATARS.map(({ initials, color, textColor }) => (
            <Avatar key={`g-${initials}`} initials={initials} color={color} textColor={textColor} size="md" />
          ))}
        </AvatarGroup>
      </div>
      <div className="space-y-1.5 max-w-sm">
        {AVATARS.map(({ initials, name, role, color, textColor }) => (
          <AvatarRow
            key={name}
            initials={initials}
            name={name}
            role={role}
            color={color}
            textColor={textColor}
          />
        ))}
      </div>
    </div>
  );
}
