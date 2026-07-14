'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '../../../store/useTransactionStore';
import { Transaction } from '../../../types/transaction';
import TransactionModal from '../../../components/TransactionModal';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { useToast } from '../../../hooks/useToast';
import { FinancialSummary } from '../components/FinancialSummary';
import { TransactionFilters } from './components/TransactionFilters';
import { TransactionTable } from './components/TransactionTable';
import { TransactionPagination } from './components/TransactionPagination';

export default function TransactionsPage() {
  const { toast } = useToast();
  const {
    transactions,
    totalTransactions: total,
    summary,
    loading,
    filters,
    setFilters,
    fetchTransactions,
    fetchSummary,
    updateTransaction,
    createTransaction,
    deleteTransaction,
  } = useTransactionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >();
  const [isViewing, setIsViewing] = useState(false);
  const [deletingTransactionId, setDeletingTransactionId] = useState<
    string | null
  >(null);

  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, [
    filters.page,
    filters.limit,
    filters.search,
    filters.type,
    filters.sortBy,
    filters.order,
    fetchTransactions,
    fetchSummary,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({ search: searchTerm, page: 1 });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setFilters]);

  const handleSave = async (data: any) => {
    try {
      if (data.id) {
        await updateTransaction(data.id, data);
        toast.success('Registro atualizado com sucesso.');
      } else {
        await createTransaction(data);
        toast.success('Novo registro adicionado ao Ledger.');
      }
      setIsModalOpen(false);
      setEditingTransaction(undefined);
    } catch (e) {
      toast.error('Erro de sincronização ao salvar dados.');
    }
  };

  const handleDelete = async () => {
    if (!deletingTransactionId) return;
    try {
      await deleteTransaction(deletingTransactionId);
      setDeletingTransactionId(null);
      toast.success('Registro removido do sistema.');
    } catch (e) {
      toast.error('Falha ao tentar excluir o registro.');
    }
  };

  const totalPages = Math.ceil(total / (filters.limit || 10));

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna da esquerda (menor): Resumo Financeiro */}
        <div className="lg:col-span-3 lg:sticky lg:top-[90px] self-start">
          <div className="flex justify-between items-center px-1 mb-4">
            <h3
              className="uppercase text-foreground font-bold text-lg"
              style={{ fontFamily: 'var(--font-header)' }}
            >
              RESUMO FINANCEIRO
            </h3>
          </div>
          {summary && (
            <FinancialSummary
              balance={summary.balance}
              totalIncome={summary.totalIncome}
              totalExpense={summary.totalExpense}
              className="flex flex-col gap-6 font-space-grotesk"
            />
          )}
        </div>

        {/* Coluna da direita (maior): Filtros, Tabela e Paginação */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          <TransactionFilters
            filters={filters}
            onFilterChange={setFilters}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onNewTransaction={() => {
              setEditingTransaction(undefined);
              setIsModalOpen(true);
            }}
          />

          <div className="flex flex-col">
            <TransactionTable
              transactions={transactions}
              loading={loading}
              onEdit={(t) => {
                setEditingTransaction(t);
                setIsModalOpen(true);
              }}
              onDelete={setDeletingTransactionId}
              onDetail={(t) => {
                setEditingTransaction(t);
                setIsViewing(true);
                setIsModalOpen(true);
              }}
            />

            <TransactionPagination
              currentPage={filters.page || 1}
              totalPages={totalPages}
              totalRecords={total}
              onPageChange={(page) => setFilters({ page })}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TransactionModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingTransaction(undefined);
            setIsViewing(false);
          }}
          onSave={handleSave}
          transaction={editingTransaction}
          mode={isViewing ? 'view' : 'edit'}
        />
      )}

      {deletingTransactionId && (
        <ConfirmDeleteModal
          onClose={() => setDeletingTransactionId(null)}
          onConfirm={handleDelete}
          title="Confirmar Exclusão"
          message="Tem certeza que deseja excluir esta transação? Esta operação é irreversível no registro do Ledger."
        />
      )}
    </div>
  );
}
