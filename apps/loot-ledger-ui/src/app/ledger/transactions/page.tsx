'use client';

import { useState, useEffect } from 'react';
import {
  TransactionService,
  TransactionFilters as ITransactionFilters,
} from '../../../services/transaction.service';
import { Transaction } from '../../../types/transaction';
import TransactionModal from '../../../components/TransactionModal';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { useQuery } from '../../../hooks/useQuery';
import { useToast } from '../../../hooks/useToast';

import { TransactionFilters } from './components/TransactionFilters';
import { TransactionTable } from './components/TransactionTable';
import { TransactionPagination } from './components/TransactionPagination';

export default function TransactionsPage() {
  const { toast } = useToast();
  const [filters, setFilters] = useState<ITransactionFilters>({
    page: 1,
    limit: 10,
    search: '',
    type: undefined,
    sortBy: 'date',
    order: 'DESC',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<
    Transaction | undefined
  >();
  const [isViewing, setIsViewing] = useState(false);
  const [deletingTransactionId, setDeletingTransactionId] = useState<
    string | null
  >(null);

  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  const {
    data: response,
    loading,
    refetch,
  } = useQuery(() => TransactionService.getAll(filters));

  const transactions = response?.data || [];
  const total = response?.total || 0;

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSave = async (data: any) => {
    try {
      if (data.id) {
        await TransactionService.update(data.id, data);
        toast.success('Registro atualizado com sucesso.');
      } else {
        await TransactionService.create(data);
        toast.success('Novo registro adicionado ao Ledger.');
      }
      setIsModalOpen(false);
      setEditingTransaction(undefined);
      refetch();
    } catch (e) {
      toast.error('Erro de sincronização ao salvar dados.');
    }
  };

  const handleDelete = async () => {
    if (!deletingTransactionId) return;
    try {
      await TransactionService.delete(deletingTransactionId);
      setDeletingTransactionId(null);
      refetch();
      toast.success('Registro removido do sistema.');
    } catch (e) {
      toast.error('Falha ao tentar excluir o registro.');
    }
  };

  const totalPages = Math.ceil(total / (filters.limit || 10));

  return (
    <div className="flex flex-col gap-6">
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
          onPageChange={(page) => setFilters({ ...filters, page })}
          loading={loading}
        />
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
          title="Confirmar_Exclusão"
          message="Tem certeza que deseja excluir esta transação? Esta operação é irreversível no registro do Ledger."
        />
      )}
    </div>
  );
}
