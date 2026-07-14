import * as React from "react";
import { cn } from "./utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-secondary/70 animate-pulse", className)} />
  );
}

export function SkeletonCard() {
  return (
    <div className="border border-border p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-9 h-9" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-2.5 w-full" />
      <Skeleton className="h-2.5 w-4/5" />
      <Skeleton className="h-2.5 w-2/3" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}
