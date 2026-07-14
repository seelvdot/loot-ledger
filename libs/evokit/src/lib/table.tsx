'use client';

import * as React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "./badge";
import { cn } from "./utils";

const FONT_MONO = "var(--font-mono)";

export interface TableRowData {
  name: string;
  role: string;
  status: "active" | "invited" | "inactive" | string;
  joined: string;
  mrr: string;
}

export const ALL_ROWS: TableRowData[] = [
  { name: "Aria Chen", role: "Design Lead", status: "active", joined: "Jan 12, 2024", mrr: "$4,200" },
  { name: "Marcus Webb", role: "Engineer", status: "active", joined: "Mar 3, 2024", mrr: "$3,800" },
  { name: "Sela Noboa", role: "PM", status: "invited", joined: "Apr 17, 2024", mrr: "$2,100" },
  { name: "Tom Haruki", role: "Engineer", status: "inactive", joined: "Nov 28, 2023", mrr: "$3,600" },
  { name: "Priya Menon", role: "Design", status: "active", joined: "Jun 5, 2024", mrr: "$3,200" },
  { name: "Kenji Mori", role: "Engineer", status: "active", joined: "Feb 14, 2024", mrr: "$4,100" },
  { name: "Camille Roy", role: "Design", status: "invited", joined: "May 22, 2024", mrr: "$2,800" },
  { name: "Dev Patel", role: "PM", status: "active", joined: "Dec 1, 2023", mrr: "$3,400" },
  { name: "Lena Park", role: "Engineer", status: "inactive", joined: "Oct 9, 2023", mrr: "$3,900" },
  { name: "Finn Larsen", role: "Design Lead", status: "active", joined: "Mar 30, 2024", mrr: "$4,500" },
  { name: "Nadia Osei", role: "Engineer", status: "active", joined: "Jul 7, 2024", mrr: "$3,700" },
  { name: "Omar Diaz", role: "PM", status: "inactive", joined: "Sep 18, 2023", mrr: "$2,600" },
];

const STATUS_BADGE: Record<string, React.ReactNode> = {
  active: <Badge variant="success">Active</Badge>,
  invited: <Badge variant="info">Invited</Badge>,
  inactive: <Badge variant="outline">Inactive</Badge>,
};

export function PaginatedTable({ data = ALL_ROWS }: { data?: TableRowData[] }) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<"name" | "role" | "mrr" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const PER_PAGE = 4;

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey].replace("$", "").replace(",", "");
    const bv = b[sortKey].replace("$", "").replace(",", "");
    const cmp = isNaN(Number(av)) ? av.localeCompare(bv) : Number(av) - Number(bv);
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const rows = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSort = (key: "name" | "role" | "mrr") => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const SortIcon = ({ k }: { k: string }) =>
    sortKey === k
      ? sortDir === "asc" ? <ChevronUp size={11} className="text-primary" /> : <ChevronDown size={11} className="text-primary" />
      : <span className="w-[11px]" />;

  return (
    <div className="border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            {(["Name", "Role", "Status", "Joined", "MRR"] as const).map(h => {
              const key = h.toLowerCase() as any;
              const sortable = ["name", "role", "mrr"].includes(key);
              return (
                <th key={h}
                  onClick={sortable ? () => toggleSort(key) : undefined}
                  className={cn(
                    "text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground",
                    sortable && "cursor-pointer hover:text-foreground transition-colors select-none"
                  )}
                  style={{ fontFamily: FONT_MONO }}
                >
                  <span className="inline-flex items-center gap-1">
                    {h}{sortable && <SortIcon k={key} />}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.name} className={cn("border-b border-border/50 hover:bg-secondary/20 transition-colors", i === rows.length - 1 && "border-0")}>
              <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.role}</td>
              <td className="px-4 py-3">{STATUS_BADGE[row.status] || <Badge variant="outline">{row.status}</Badge>}</td>
              <td className="px-4 py-3 text-[11px] text-muted-foreground" style={{ fontFamily: FONT_MONO }}>{row.joined}</td>
              <td className="px-4 py-3 text-[11px] text-foreground" style={{ fontFamily: FONT_MONO }}>{row.mrr}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
        <p className="text-[10px] text-muted-foreground" style={{ fontFamily: FONT_MONO }}>
          {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, data.length)} of {data.length} members
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors text-xs"
            style={{ fontFamily: FONT_MONO }}
          >
            «
          </button>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft size={12} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(
                "w-7 h-7 flex items-center justify-center border text-[10px] transition-colors",
                page === p
                  ? "border-primary bg-primary/10 text-primary font-bold"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
              style={{ fontFamily: FONT_MONO }}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight size={12} />
          </button>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors text-xs"
            style={{ fontFamily: FONT_MONO }}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}

export function Table({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className={cn("w-full text-sm", className)} {...props}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-border/50 hover:bg-secondary/20 transition-colors font-space-grotesk",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className,
  style,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "text-left px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground",
        className
      )}
      style={{ fontFamily: 'var(--font-mono)', ...style }}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-4 py-3", className)} {...props}>
      {children}
    </td>
  );
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords?: number;
  recordsLabel?: string;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  pageSize?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  recordsLabel = "registros",
  onPageChange,
  disabled = false,
  pageSize,
}: PaginationProps) {
  const showStartEnd = totalRecords !== undefined && pageSize !== undefined;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/20">
      {showStartEnd ? (
        <p className="text-[10px] text-muted-foreground uppercase font-mono" style={{ fontFamily: 'var(--font-mono)' }}>
          {Math.min((currentPage - 1) * pageSize + 1, totalRecords)}–{Math.min(currentPage * pageSize, totalRecords)} de {totalRecords} {recordsLabel}
        </p>
      ) : totalRecords !== undefined ? (
        <p className="text-[10px] text-muted-foreground uppercase font-mono" style={{ fontFamily: 'var(--font-mono)' }}>
          Total {totalRecords} {recordsLabel}
        </p>
      ) : (
        <p className="text-[10px] text-muted-foreground uppercase font-mono" style={{ fontFamily: 'var(--font-mono)' }}>
          Página {currentPage} de {totalPages || 1}
        </p>
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || disabled}
          className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors text-xs font-mono"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          «
        </button>

        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || disabled}
          className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft size={12} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
          .map((p, idx, arr) => {
            const isGap = idx > 0 && p - arr[idx - 1] > 1;
            return (
              <React.Fragment key={p}>
                {isGap && (
                  <span className="w-7 h-7 flex items-center justify-center text-[10px] text-muted-foreground font-mono">
                    ...
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onPageChange(p)}
                  className={cn(
                    "w-7 h-7 flex items-center justify-center border text-[10px] transition-colors font-mono",
                    currentPage === p
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {p}
                </button>
              </React.Fragment>
            );
          })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || disabled}
          className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight size={12} />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || disabled}
          className="w-7 h-7 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors text-xs font-mono"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          »
        </button>
      </div>
    </div>
  );
}
