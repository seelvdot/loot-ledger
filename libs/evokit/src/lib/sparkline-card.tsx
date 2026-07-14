'use client';

import * as React from "react";
import { useId } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

export interface SparklineCardProps {
  title: string;
  value: string | number;
  trend: string | number;
  trendDirection?: "up" | "down" | "neutral";
  data: number[];
  height?: number;
  className?: string;
}

export function SparklineCard({
  title,
  value,
  trend,
  trendDirection = "neutral",
  data = [],
  height = 50,
  className,
}: SparklineCardProps) {
  const gradientId = useId().replace(/:/g, "");

  // Generate SVG path coordinates
  const minVal = data.length > 0 ? Math.min(...data) : 0;
  const maxVal = data.length > 0 ? Math.max(...data) : 100;
  const range = maxVal - minVal || 1;

  const points = data.map((val, idx) => {
    const x = data.length > 1 ? (idx / (data.length - 1)) * 100 : 0;
    // Map value to Y coordinate (0 is top, height is bottom. We keep 4px margin top/bottom)
    const y = height - ((val - minVal) / range) * (height - 8) - 4;
    return { x, y };
  });

  const linePath = points.reduce((acc, p, idx) => {
    return acc + `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
  }, "");

  const fillPath = data.length > 1
    ? `${linePath} L 100 ${height} L 0 ${height} Z`
    : "";

  const trendColors = {
    up: {
      text: "text-[var(--status-success)]",
      bg: "bg-[var(--status-success-bg)]",
      border: "border-[var(--status-success-border)]",
      icon: <TrendingUp size={12} className="shrink-0" />,
    },
    down: {
      text: "text-[var(--status-danger)]",
      bg: "bg-[var(--status-danger-bg)]",
      border: "border-[var(--status-danger-border)]",
      icon: <TrendingDown size={12} className="shrink-0" />,
    },
    neutral: {
      text: "text-muted-foreground",
      bg: "bg-secondary",
      border: "border-border",
      icon: <Minus size={12} className="shrink-0" />,
    },
  };

  const trendStyle = trendColors[trendDirection];

  // Accent color line based on trend
  const strokeColor = trendDirection === "up"
    ? "var(--status-success)"
    : trendDirection === "down"
    ? "var(--status-danger)"
    : "var(--primary)";

  return (
    <div className={cn("border border-border bg-card p-5 flex flex-col justify-between select-none relative overflow-hidden", className)}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-1.5" style={{ fontFamily: FONT_MONO }}>
            {title}
          </p>
          <p className="text-3xl font-bold font-header text-foreground tracking-tight" style={{ fontFamily: FONT_HEADER }}>
            {value}
          </p>
        </div>
        
        {/* Trend Indicator */}
        <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 border font-header", trendStyle.text, trendStyle.bg, trendStyle.border)} style={{ fontFamily: FONT_HEADER }}>
          {trendStyle.icon}
          {trend}
        </span>
      </div>

      {/* Sparkline Graphic */}
      <div className="relative w-full overflow-hidden" style={{ height }}>
        {data.length > 1 && (
          <svg
            className="w-full h-full"
            viewBox={`0 0 100 ${height}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.2} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            {/* Fill Area */}
            <path d={fillPath} fill={`url(#${gradientId})`} />
            {/* Outline Line */}
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
