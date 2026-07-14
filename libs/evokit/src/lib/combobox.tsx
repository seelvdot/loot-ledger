'use client';

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, AlertCircle, X } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";
const FONT_BASE = "var(--font-base)";
const FONT_MONO = "var(--font-mono)";

export interface ComboboxOption {
  value: string;
  label: string;
  group?: string;
}

export interface ComboboxProps {
  value?: string;
  onChange?: (val: string) => void;
  options?: ComboboxOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  multi?: boolean;
}

export function Combobox({
  value,
  onChange,
  options = [],
  placeholder = "Selecione uma opção…",
  label,
  error,
  disabled = false,
  multi = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(query.toLowerCase()) ||
    (o.group && o.group.toLowerCase().includes(query.toLowerCase()))
  );

  const groups = [...new Set(filtered.map(o => o.group || ""))];

  const selectedValues = value ? value.split(",").filter(Boolean) : [];

  const exactMatch = options.some(
    (o) =>
      o.label.toLowerCase() === query.toLowerCase() ||
      o.value.toLowerCase() === query.toLowerCase()
  );
  const showCreatable = query.trim() !== "" && !exactMatch;

  const handleSelect = (val: string) => {
    if (multi) {
      const nextValues = selectedValues.includes(val)
        ? selectedValues.filter(v => v !== val)
        : [...selectedValues, val];
      if (onChange) onChange(nextValues.join(","));
      setQuery("");
    } else {
      if (onChange) onChange(val);
      setOpen(false);
      setQuery("");
    }
  };

  const selectedOption = options.find(o => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : "";

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={ref}>
      {label && (
        <label
          className="text-[10px] font-semibold text-foreground uppercase tracking-widest font-space-grotesk"
          style={{ fontFamily: FONT_HEADER }}
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        <div
          onClick={() => {
            if (disabled) return;
            setOpen(o => !o);
            if (!open) {
              setTimeout(() => inputRef.current?.focus(), 50);
            }
          }}
          className={cn(
            "flex flex-wrap items-center gap-1.5 min-h-[38px] border bg-input-background px-3 py-2 cursor-pointer transition-colors focus-within:ring-1 focus-within:ring-ring w-full",
            error ? "border-rose-400/60" : "border-border",
            disabled && "opacity-50 pointer-events-none"
          )}
        >
          {multi && selectedValues.map(val => {
            const opt = options.find(o => o.value === val) || { value: val, label: val };
            return (
              <span
                key={val}
                className="flex items-center gap-1 bg-secondary text-foreground text-xs px-2 py-0.5 border border-border"
                style={{ fontFamily: FONT_BASE }}
              >
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(val);
                  }}
                  className="hover:text-primary text-muted-foreground font-bold ml-1 transition-colors"
                >
                  <X size={10} />
                </button>
              </span>
            );
          })}

          <input
            ref={inputRef}
            value={multi ? query : (open ? query : displayLabel)}
            onChange={e => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              if (disabled) return;
              setOpen(true);
            }}
            onClick={e => e.stopPropagation()}
            placeholder={multi && selectedValues.length > 0 ? "" : placeholder}
            disabled={disabled}
            className="flex-1 min-w-[60px] bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            style={{ fontFamily: FONT_BASE }}
          />
          <ChevronDown size={13} className="text-muted-foreground shrink-0 ml-auto" />
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-card border border-border shadow-2xl max-h-56 overflow-y-auto">
            {filtered.length === 0 && !showCreatable ? (
              <p className="px-4 py-5 text-xs text-muted-foreground text-center">Nenhuma opção encontrada.</p>
            ) : (
              <>
                {groups.length > 0 && groups.some(g => g !== "") ? (
                  groups.map(group => {
                    const opts = filtered.filter(o => (o.group || "") === group);
                    if (opts.length === 0) return null;
                    return (
                      <div key={group || "ungrouped"}>
                        {group && (
                          <p className="px-3 pt-2.5 pb-1 text-[9px] uppercase tracking-widest text-muted-foreground/60" style={{ fontFamily: FONT_MONO }}>
                            {group}
                          </p>
                        )}
                        {opts.map(opt => {
                          const active = multi ? selectedValues.includes(opt.value) : opt.value === value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => handleSelect(opt.value)}
                              className={cn(
                                "w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors cursor-pointer",
                                active ? "text-primary bg-primary/5" : "text-foreground hover:bg-secondary"
                              )}
                              style={{ fontFamily: FONT_BASE }}
                            >
                              {opt.label}
                              {active && <Check size={12} className="text-primary shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  filtered.map(opt => {
                    const active = multi ? selectedValues.includes(opt.value) : opt.value === value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelect(opt.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors cursor-pointer",
                          active ? "text-primary bg-primary/5" : "text-foreground hover:bg-secondary"
                        )}
                        style={{ fontFamily: FONT_BASE }}
                      >
                        {opt.label}
                        {active && <Check size={12} className="text-primary shrink-0" />}
                      </button>
                    );
                  })
                )}

                {showCreatable && (
                  <button
                    type="button"
                    onClick={() => handleSelect(query.trim())}
                    className="w-full flex items-center gap-1.5 px-3 py-2 text-sm text-left text-primary hover:bg-secondary cursor-pointer border-t border-border/50 font-bold"
                    style={{ fontFamily: FONT_BASE }}
                  >
                    Adicionar "{query.trim()}"
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[10px] text-rose-400 flex items-center gap-1">
          <AlertCircle size={10} />
          {error}
        </p>
      )}
    </div>
  );
}
