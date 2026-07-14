'use client';

import * as React from "react";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "./utils";

export interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, defaultChecked, checked, onChange, onBlur, name, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked ?? defaultChecked ?? false);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const hiddenInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleRef = (node: HTMLInputElement | null) => {
      hiddenInputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      if (hiddenInputRef.current) {
        hiddenInputRef.current.click();
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-3 border border-border hover:bg-secondary/30 transition-colors"
      >
        <span className="text-sm text-foreground">{label}</span>
        
        <input
          ref={handleRef}
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={handleInputChange}
          onBlur={onBlur}
          className="sr-only"
          {...props}
        />

        <div className={cn(
          "relative w-11 h-[22px] rounded-full shrink-0 transition-colors duration-200 mr-1",
          isChecked ? "bg-primary" : "bg-secondary border border-border"
        )}>
          <div className="absolute inset-0 flex items-center px-[3px]">
            <div className={cn(
              "w-4 h-4 rounded-full bg-background transition-transform duration-200 flex items-center justify-center",
              isChecked ? "translate-x-[22px]" : "translate-x-0"
            )}>
              {isChecked
                ? <Check size={9} className="text-primary" strokeWidth={3} />
                : <X size={9} className="text-muted-foreground" strokeWidth={2.5} />}
            </div>
          </div>
        </div>
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

