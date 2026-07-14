import { Button, InputField, Combobox } from '@core/evokit';
import { Search } from '@mynaui/icons-react';
import { TransactionFilters as ITransactionFilters } from '../../../../services/transaction.service';

interface TransactionFiltersProps {
  filters: ITransactionFilters;
  onFilterChange: (filters: ITransactionFilters) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onNewTransaction: () => void;
}

export function TransactionFilters({
  filters,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onNewTransaction,
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-wrap gap-4 items-end flex-1">
        <div className="w-full max-w-xs">
          <InputField
            label="PESQUISAR REGISTRO"
            placeholder="FILTRAR POR DESCRIÇÃO"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            prefix={<Search size={16} />}
          />
        </div>

        <div>
          <Combobox
            label="CATEGORIA DE FLUXO"
            value={filters.type || 'ALL'}
            onChange={(val) =>
              onFilterChange({
                ...filters,
                type: val === 'ALL' ? undefined : (val as 'INCOME' | 'EXPENSE'),
                page: 1,
              })
            }
            options={[
              { value: 'ALL', label: 'TODOS OS LOGS' },
              { value: 'INCOME', label: 'ENTRADAS' },
              { value: 'EXPENSE', label: 'SAÍDAS' },
            ]}
          />
        </div>

        <div>
          <Combobox
            label="ORDENAÇÃO DO LEDGER"
            value={`${filters.sortBy}-${filters.order}`}
            onChange={(val) => {
              const [sortBy, order] = val.split('-');
              onFilterChange({
                ...filters,
                sortBy,
                order: order as 'ASC' | 'DESC',
                page: 1,
              });
            }}
            options={[
              { value: 'date-DESC', label: 'MAIS RECENTES' },
              { value: 'date-ASC', label: 'MAIS ANTIGOS' },
              { value: 'amount-DESC', label: 'MAIOR VALOR' },
              { value: 'amount-ASC', label: 'MENOR VALOR' },
            ]}
          />
        </div>
      </div>

      <Button
        onClick={onNewTransaction}
        size="md"
      >
        Nova Transação
      </Button>
    </div>
  );
}
