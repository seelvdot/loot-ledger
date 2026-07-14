import { Button } from '@core/evokit';

interface LedgerHeaderProps {
  userName: string;
  onNewTransaction: () => void;
}

export function LedgerHeader({
  userName,
  onNewTransaction,
}: LedgerHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <span
          className="text-primary text-[10px] uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          OPERATIONAL SYSTEM // LOOT LEDGER
        </span>
        <h1
          className="text-3xl font-bold uppercase text-foreground"
          style={{ fontFamily: 'var(--font-header)' }}
        >
          BEM-VINDO, <span className="text-primary">{userName}</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          size="md"
          onClick={onNewTransaction}
        >
          Nova Transação
        </Button>
      </div>
    </div>
  );
}
