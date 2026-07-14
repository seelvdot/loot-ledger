'use client';

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "./utils";

const FONT_HEADER = "var(--font-header)";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  placement?: "left" | "right"; // Side the drawer opens from (default: "right")
  size?: "sm" | "md" | "lg" | "xl"; // Size variant widths (default: "md")
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  placement = "right",
  size = "md",
}: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const sizes = {
    sm: "w-full max-w-xs",
    md: "w-full max-w-md",
    lg: "w-full max-w-lg",
    xl: "w-full max-w-xl",
  };

  const placements = {
    right: {
      enter: "translate-x-0",
      leave: "translate-x-full",
      border: "border-l",
      position: "right-0 top-0 bottom-0 h-full",
    },
    left: {
      enter: "translate-x-0",
      leave: "-translate-x-full",
      border: "border-r",
      position: "left-0 top-0 bottom-0 h-full",
    },
  };

  const currentPlacement = placements[placement];

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop (dimmed & blurred) */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-all duration-300"
      />

      {/* Drawer Panel Container */}
      <div
        className={cn(
          "absolute bg-card border-border shadow-2xl flex flex-col transition-transform duration-300 ease-out",
          currentPlacement.position,
          currentPlacement.border,
          sizes[size],
          open ? currentPlacement.enter : currentPlacement.leave
        )}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/10 shrink-0">
          {title ? (
            <h3
              className="font-bold text-base uppercase tracking-widest text-foreground"
              style={{ fontFamily: FONT_HEADER }}
            >
              {title}
            </h3>
          ) : (
            <div className="w-1 h-1" />
          )}
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
            aria-label="Close panel"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 leading-relaxed text-sm text-foreground">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
