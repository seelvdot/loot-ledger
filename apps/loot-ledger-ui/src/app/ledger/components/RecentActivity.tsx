import Link from 'next/link';
import { Heading, Text } from '@radix-ui/themes';
import { Button } from '@loot-ledger/ui';

import { Transaction } from '../../../types/transaction';

interface RecentActivityProps {
  transactions: Transaction[];
}

export function RecentActivity({ transactions }: RecentActivityProps) {
  return (
    <div className="flex flex-col gap-4 font-space-grotesk">
      <div className="flex justify-between items-center px-1">
        <Heading
          size="4"
          className="uppercase text-neutral-200 font-space-grotesk!"
        >
          ÚLTIMAS_TRANSAÇÕES
        </Heading>
        <Link href="/ledger/transactions">
          <Button
            variant="outline"
            size="1"
            className="uppercase! text-lime-300 hover:text-lime-400 font-space-grotesk cursor-pointer!"
          >
            Ver_Todas
          </Button>
        </Link>
      </div>

      <div className="ring-1 ring-neutral-300/10 bg-neutral-100/2.5 divide-y divide-neutral-300/5">
        {transactions.length === 0 ? (
          <div className="p-10 text-center text-neutral-500 uppercase text-xs">
            Nenhum registro encontrado.
          </div>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className="p-5 flex items-center justify-between hover:bg-lime-300/5 transition-colors"
            >
              <div className="flex flex-col">
                <Text className="text-neutral-200 font-medium block">
                  {t.description}
                </Text>
                <Text
                  size="1"
                  className="text-neutral-500 uppercase text-[10px]"
                >
                  {t.category} • {new Date(t.date).toLocaleDateString()}
                </Text>
              </div>
              <Text
                className={`font-mono font-bold ${t.type === 'INCOME' ? 'text-lime-400' : 'text-red-400'}`}
              >
                {t.type === 'INCOME' ? '+' : '-'} R${' '}
                {t.amount.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
