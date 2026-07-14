import Link from 'next/link';
import { Button } from '@core/evokit';

import { Transaction } from '../../../types/transaction';

interface RecentActivityProps {
  transactions: Transaction[];
}

export function RecentActivity({ transactions }: RecentActivityProps) {
  return (
    <div className="flex flex-col gap-4 font-space-grotesk">
      <div className="flex justify-between items-center px-1">
        <h3
          className="uppercase text-foreground font-bold text-lg"
          style={{ fontFamily: 'var(--font-header)' }}
        >
          ÚLTIMAS TRANSAÇÕES
        </h3>
        <Link href="/ledger/transactions">
          <Button
            variant="outline"
            size="sm"
          >
            Ver Todas
          </Button>
        </Link>
      </div>

      <div className="border border-border bg-card divide-y divide-border/50">
        {transactions.length === 0 ? (
          <div
            className="p-10 text-center text-muted-foreground uppercase text-xs"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Nenhum registro encontrado.
          </div>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className="p-5 flex items-center justify-between hover:bg-secondary/20 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-foreground font-medium block text-sm">
                  {t.description}
                </span>
                <span
                  className="text-muted-foreground uppercase text-[10px]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t.category} • {new Date(t.date).toLocaleDateString()}
                </span>
              </div>
              <span
                className={`font-bold text-sm ${t.type === 'INCOME' ? 'text-primary' : 'text-rose-400'}`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {t.type === 'INCOME' ? '+' : '-'} R${' '}
                {t.amount.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
