'use client';

import * as React from "react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

export interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number; // Total diameter of progress element (default: 80)
  strokeWidth?: number; // Width of SVG progress ring border stroke (default: 8)
  label?: string; // Optional custom text inside. If omitted, shows 'value%'
  color?: string; // Color of active progress line (default: oklch of --primary)
  className?: string;
}

export function CircularProgress({
  value,
  size = 80,
  strokeWidth = 8,
  label,
  color = "var(--primary)",
  className,
}: CircularProgressProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  // Geometrical computations
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center select-none", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Track Circle (Background) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="var(--secondary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle (Foreground) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-300 ease-out"
        />
      </svg>

      {/* Label Content Overlay */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        {label ? (
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider" style={{ fontFamily: FONT_HEADER }}>
            {label}
          </span>
        ) : (
          <span className="text-sm font-bold text-foreground tabular-nums" style={{ fontFamily: FONT_MONO }}>
            {clampedValue}%
          </span>
        )}
      </div>
    </div>
  );
}
