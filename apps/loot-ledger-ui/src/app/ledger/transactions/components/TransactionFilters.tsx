import { TextField, Select, Button } from '@radix-ui/themes';
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
          <p className="uppercase text-lime-300 text-[10px] mb-1 font-space-grotesk">
            PESQUISAR_REGISTRO
          </p>
          <TextField.Root
            placeholder="FILTRAR_POR_DESCRICAO"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            size="3"
            className="text-xs!"
            color="lime"
          >
            <TextField.Slot>
              <Search size={16} />
            </TextField.Slot>
          </TextField.Root>
        </div>

        <div>
          <p className="uppercase text-lime-300 text-[10px] mb-1 font-space-grotesk">
            CATEGORIA_FLUXO
          </p>
          <Select.Root
            value={filters.type || 'ALL'}
            onValueChange={(val) =>
              onFilterChange({
                ...filters,
                type: val === 'ALL' ? undefined : val,
                page: 1,
              })
            }
            size="3"
          >
            <Select.Trigger className="text-xs!" color="lime" />
            <Select.Content position="popper" className="font-space-grotesk!">
              <Select.Item value="ALL" className="text-sm!">
                TODOS_OS_LOGS
              </Select.Item>
              <Select.Item value="INCOME" className="text-sm!">
                ENTRADAS
              </Select.Item>
              <Select.Item value="EXPENSE" className="text-sm!">
                SAÍDAS
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div>
          <p className="uppercase text-lime-300 text-[10px] mb-1 font-space-grotesk">
            ORDENACAO_LEDGER
          </p>
          <Select.Root
            value={`${filters.sortBy}-${filters.order}`}
            onValueChange={(val) => {
              const [sortBy, order] = val.split('-');
              onFilterChange({
                ...filters,
                sortBy,
                order: order as 'ASC' | 'DESC',
                page: 1,
              });
            }}
            size="3"
          >
            <Select.Trigger className="text-xs!" color="lime" />
            <Select.Content position="popper" className="font-space-grotesk!">
              <Select.Item value="date-DESC" className="text-sm!">
                MAIS_RECENTES
              </Select.Item>
              <Select.Item value="date-ASC" className="text-sm!">
                MAIS_ANTIGOS
              </Select.Item>
              <Select.Item value="amount-DESC" className="text-sm!">
                MAIOR_VALOR
              </Select.Item>
              <Select.Item value="amount-ASC" className="text-sm!">
                MENOR_VALOR
              </Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>

      <Button
        onClick={onNewTransaction}
        className="uppercase! cursor-pointer! font-space-grotesk!"
        size="3"
        color="lime"
      >
        Nova_Transação
      </Button>
    </div>
  );
}
