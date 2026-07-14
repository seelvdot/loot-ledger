'use client';

import * as React from "react";
import { useState } from "react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_MONO = "var(--font-mono)";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ label, min = 0, max = 100, defaultValue = 50, value: controlledValue, onChange, unit = "", ...props }, ref) => {
    const [value, setValue] = useState(controlledValue ?? defaultValue ?? 50);
    
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const numericValue = Number(value);
    const numericMin = Number(min);
    const numericMax = Number(max);
    const pct = ((numericValue - numericMin) / (numericMax - numericMin)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value));
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-semibold text-foreground uppercase tracking-widest" style={{ fontFamily: FONT_HEADER }}>{label}</span>
          <span className="text-[10px] text-muted-foreground tabular-nums" style={{ fontFamily: FONT_MONO }}>{value}{unit}</span>
        </div>
        <div className="relative flex items-center h-4">
          <div className="absolute w-full h-1 bg-secondary overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            className="relative w-full h-1 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            {...props}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

