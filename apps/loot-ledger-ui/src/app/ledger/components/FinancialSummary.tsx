import { Card, Badge } from '@core/evokit';

interface FinancialSummaryProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  className?: string;
}

export function FinancialSummary({
  balance,
  totalIncome,
  totalExpense,
  className = "grid grid-cols-1 md:grid-cols-3 gap-6 font-space-grotesk",
}: FinancialSummaryProps) {
  return (
    <div className={className}>
      <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Badge variant="outline">
            Saldo Atual
          </Badge>
        </div>
        <div>
          <span
            className="text-muted-foreground text-[10px] uppercase mb-1 block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Disponível_em_Conta
          </span>
          <h2
            className={`text-2xl font-bold ${balance >= 0 ? 'text-primary' : 'text-rose-400'}`}
            style={{ fontFamily: 'var(--font-header)' }}
          >
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Badge variant="success">
            Entradas
          </Badge>
        </div>
        <div>
          <span
            className="text-muted-foreground text-[10px] uppercase mb-1 block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Total_Acumulado
          </span>
          <h2
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-header)' }}
          >
            + R${' '}
            {totalIncome.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <Badge variant="danger">
            Saídas
          </Badge>
        </div>
        <div>
          <span
            className="text-muted-foreground text-[10px] uppercase mb-1 block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Total_Gastos
          </span>
          <h2
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: 'var(--font-header)' }}
          >
            - R${' '}
            {totalExpense.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
      </Card>
    </div>
  );
}
