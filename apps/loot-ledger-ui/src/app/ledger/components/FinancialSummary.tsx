import { Heading, Text, Badge } from '@radix-ui/themes';

interface FinancialSummaryProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export function FinancialSummary({
  balance,
  totalIncome,
  totalExpense,
}: FinancialSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-space-grotesk">
      <div className="ring-1 ring-neutral-300/10 bg-neutral-100/2.5 p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Badge
            color="gray"
            variant="surface"
            className="uppercase text-[9px] font-space-grotesk!"
          >
            Saldo Atual
          </Badge>
        </div>
        <div>
          <Text size="1" className="text-neutral-500 uppercase mb-1 block">
            Disponível_em_Conta
          </Text>
          <Heading
            size="7"
            className={`font-space-grotesk! ${balance >= 0 ? 'text-lime-300' : 'text-red-400'}`}
          >
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Heading>
        </div>
      </div>

      <div className="ring-1 ring-neutral-300/10 bg-neutral-100/2.5 p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Badge
            color="lime"
            variant="soft"
            className="uppercase text-[9px] font-space-grotesk!"
          >
            Entradas
          </Badge>
        </div>
        <div>
          <Text size="1" className="text-neutral-500 uppercase mb-1 block">
            Total_Acumulado
          </Text>
          <Heading size="7" className="font-space-grotesk! text-neutral-100">
            + R${' '}
            {totalIncome.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </Heading>
        </div>
      </div>

      <div className="ring-1 ring-neutral-300/10 bg-neutral-100/2.5 p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Badge
            color="red"
            variant="soft"
            className="uppercase text-[9px] font-space-grotesk!"
          >
            Saídas
          </Badge>
        </div>
        <div>
          <Text size="1" className="text-neutral-500 uppercase mb-1 block">
            Total_Gastos
          </Text>
          <Heading size="7" className="font-space-grotesk! text-neutral-100">
            - R${' '}
            {totalExpense.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </Heading>
        </div>
      </div>
    </div>
  );
}
