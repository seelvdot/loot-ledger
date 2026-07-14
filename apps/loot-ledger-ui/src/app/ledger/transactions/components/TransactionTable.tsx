import {
  Badge,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Dropdown,
  DropdownItem,
  DropdownLabel,
} from '@core/evokit';
import { Tooltip } from '@radix-ui/themes';
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
    <Table>
      <TableHeader>
        <TableRow className="bg-secondary/50 text-xs">
          <TableHead className="py-2">Data</TableHead>
          <TableHead className="py-2">Descrição</TableHead>
          <TableHead className="py-2">Observação</TableHead>
          <TableHead className="py-2">Categoria</TableHead>
          <TableHead className="py-2">Subcategoria</TableHead>
          <TableHead className="py-2">Tipo</TableHead>
          <TableHead className="py-2 text-right">Valor</TableHead>
          <TableHead className="py-2 text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-10">
              <span
                className="animate-pulse text-primary font-bold uppercase tracking-widest text-xs font-mono"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                SINCRONIZANDO DADOS DO SERVIDOR...
              </span>
            </TableCell>
          </TableRow>
        ) : transactions.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={8}
              className="text-center py-10 text-muted-foreground uppercase text-xs font-mono"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Nenhum registro encontrado no Ledger.
            </TableCell>
          </TableRow>
        ) : (
          transactions.map((t) => {
            const subs = t.subcategory
              ? t.subcategory
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [];

            return (
              <TableRow key={t.id}>
                <TableCell
                  className="py-1.5 text-muted-foreground text-xs font-mono"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {new Date(t.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="py-1.5 font-medium text-foreground">
                  {t.description}
                </TableCell>
                <TableCell
                  className="py-1.5 text-muted-foreground max-w-[200px] truncate"
                  title={t.observations}
                >
                  {t.observations || '-'}
                </TableCell>
                <TableCell className="py-1.5">
                  <Badge variant="outline">{t.category}</Badge>
                </TableCell>
                <TableCell className="py-1.5">
                  {subs.length === 0 ? (
                    <span className="text-muted-foreground">-</span>
                  ) : subs.length === 1 ? (
                    <Badge variant="outline">{subs[0]}</Badge>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Badge variant="outline">{subs[0]}</Badge>
                      <Dropdown
                        align="right"
                        trigger={
                          <button className="text-[10px] bg-secondary border border-border px-1 py-0.5 text-primary hover:bg-primary/10 transition-colors uppercase font-mono font-bold cursor-pointer">
                            +{subs.length - 1}
                          </button>
                        }
                      >
                        <DropdownLabel>Subcategorias</DropdownLabel>
                        {subs.map((s, i) => (
                          <DropdownItem key={i} className="text-xs uppercase">
                            {s}
                          </DropdownItem>
                        ))}
                      </Dropdown>
                    </div>
                  )}
                </TableCell>
                <TableCell className="py-1.5">
                  <Badge variant={t.type === 'INCOME' ? 'success' : 'danger'}>
                    {t.type === 'INCOME' ? 'Entrada' : 'Saída'}
                  </Badge>
                </TableCell>
                <TableCell
                  className={`py-1.5 text-right font-bold font-mono ${
                    t.type === 'INCOME' ? 'text-primary' : 'text-rose-400'
                  }`}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {t.type === 'INCOME' ? '+' : '-'} R${' '}
                  {t.amount.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="py-1.5">
                  <div className="flex gap-2 justify-center">
                    <Tooltip content="Editar">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit(t)}
                      >
                        <EditOne size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Detalhes">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDetail(t)}
                      >
                        <Eye size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Deletar">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDelete(t.id)}
                        className="text-rose-400 hover:text-rose-500 hover:bg-rose-500/10"
                      >
                        <Trash size={16} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
