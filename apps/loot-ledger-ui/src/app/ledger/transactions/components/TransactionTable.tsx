import { Table, Text, Badge, Tooltip, IconButton } from '@radix-ui/themes';
import { EditOne, Eye, Trash } from '@mynaui/icons-react';
import { Transaction } from '../../../../types/transaction';

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onDetail: (transaction: Transaction) => void;
}

export function TransactionTable({
  transactions,
  loading,
  onEdit,
  onDelete,
  onDetail,
}: TransactionTableProps) {
  return (
    <div className="ring-1 ring-neutral-300/10 bg-neutral-100/2.5">
      <div className="overflow-x-auto">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row className="uppercase font-space-grotesk text-md text-lime-300/50">
              <Table.ColumnHeaderCell>Data</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Descrição</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Observação</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Categoria</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Tipo</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="right">
                Valor
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center">
                Ações
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {loading ? (
              <Table.Row>
                <Table.Cell colSpan={6} align="center" className="py-10">
                  <Text className="animate-pulse text-lime-300 font-space-grotesk uppercase tracking-widest text-xs">
                    SINCRONIZANDO_DADOS_DO_SERVIDOR...
                  </Text>
                </Table.Cell>
              </Table.Row>
            ) : transactions.length === 0 ? (
              <Table.Row>
                <Table.Cell
                  colSpan={6}
                  align="center"
                  className="py-10 text-neutral-500 font-space-grotesk uppercase text-xs"
                >
                  Nenhum registro encontrado no Ledger.
                </Table.Cell>
              </Table.Row>
            ) : (
              transactions.map((t) => (
                <Table.Row
                  key={t.id}
                  className="hover:bg-lime-300/5 transition-colors border-b border-neutral-400/10 font-space-grotesk"
                >
                  <Table.Cell className="text-neutral-400 text-xs">
                    {new Date(t.date).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-normal text-neutral-200">
                    {t.description}
                  </Table.Cell>
                  <Table.Cell
                    className="font-normal text-neutral-200"
                    title={t.observations}
                  >
                    {t.observations && t.observations.length > 50
                      ? t.observations?.substring(0, 50) + '...'
                      : t.observations || '-'}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant="outline"
                      color="gray"
                      className="uppercase text-[9px] font-space-grotesk!"
                    >
                      {t.category}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={t.type === 'INCOME' ? 'lime' : 'red'}
                      variant="soft"
                      className="uppercase text-[9px] font-space-grotesk!"
                    >
                      {t.type === 'INCOME' ? 'Entrada' : 'Saída'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell
                    align="right"
                    className={`font-mono ${t.type === 'INCOME' ? 'text-lime-400' : 'text-red-400'}`}
                  >
                    {t.type === 'INCOME' ? '+' : '-'} R${' '}
                    {t.amount.toLocaleString('pt-BR', {
                      minimumFractionDigits: 1,
                    })}
                  </Table.Cell>
                  <Table.Cell align="center">
                    <div className="flex gap-4 justify-center">
                      <Tooltip content="Editar">
                        <IconButton
                          size="1"
                          variant="ghost"
                          color="gray"
                          onClick={() => onEdit(t)}
                          className="cursor-pointer!"
                        >
                          <EditOne size={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Detalhes">
                        <IconButton
                          size="1"
                          variant="ghost"
                          color="gray"
                          onClick={() => onDetail(t)}
                          className="cursor-pointer!"
                        >
                          <Eye size={16} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Deletar">
                        <IconButton
                          size="1"
                          variant="ghost"
                          color="red"
                          onClick={() => onDelete(t.id)}
                          className="cursor-pointer!"
                        >
                          <Trash size={16} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
