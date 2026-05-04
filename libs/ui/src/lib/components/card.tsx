export interface LCardProps {
  // title: string;
  // value?: string;
  children?: React.ReactNode;
}

export function LCard({ children }: LCardProps) {
  return (
    <div className="ring-1 ring-lime-300 relative bg-neutral-100/2.5">
      <div className="absolute -top-1 -right-1 w-6 h-6 border-r border-t border-lime-300" />
      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l border-b border-lime-300" />
      {/* <h2 className="text-2xl font-bold">{title}</h2> */}
      {children}
    </div>
  );
}
