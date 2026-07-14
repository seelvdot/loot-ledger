'use client';

import * as React from 'react';
import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from './utils';

const FONT_HEADER = 'var(--font-header)';
const FONT_BASE = 'var(--font-base)';

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label: string;
  helper?: string;
  error?: string;
  prefix?: React.ReactNode;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      type = 'text',
      helper,
      error,
      prefix,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);
    const isPassword = type === 'password';
    return (
      <div className="flex flex-col gap-1.5">
        <label
          className="text-[10px] font-semibold text-foreground uppercase tracking-widest"
          style={{ fontFamily: FONT_HEADER }}
        >
          {label}
        </label>
        <div
          className={cn(
            'flex items-center gap-2 border bg-input-background px-3 py-2 text-sm transition-colors focus-within:ring-1 focus-within:ring-ring',
            error ? 'border-rose-400/60' : 'border-border',
            disabled && 'opacity-50 pointer-events-none',
          )}
        >
          {prefix && (
            <span className="text-muted-foreground shrink-0">{prefix}</span>
          )}
          <input
            ref={ref}
            type={isPassword && show ? 'text' : type}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed"
            style={{ fontFamily: FONT_BASE }}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              disabled={disabled}
              className="text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          )}
        </div>
        {error ? (
          <p className="text-[10px] text-rose-400 flex items-center gap-1">
            <AlertCircle size={10} />
            {error}
          </p>
        ) : helper ? (
          <p className="text-[10px] text-muted-foreground">{helper}</p>
        ) : null}
      </div>
    );
  },
);

InputField.displayName = 'InputField';
