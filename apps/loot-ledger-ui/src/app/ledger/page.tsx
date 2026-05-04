'use client';

import { useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { TransactionService } from '../../services/transaction.service';
import { Text } from '@radix-ui/themes';
import TransactionModal from '../../components/TransactionModal';
import { useAuth } from '../../hooks/useAuth';
import { LedgerHeader } from './components/LedgerHeader';
import { FinancialSummary } from './components/FinancialSummary';
import { RecentActivity } from './components/RecentActivity';
import { useToast } from '../../hooks/useToast';

export default function LedgerPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: summary,
    loading,
    refetch,
  } = useQuery(() => TransactionService.getSummary());

  const userName = user?.email ? user.email.split('@')[0] : 'Operador';

  const handleSave = async (data: any) => {
    try {
      await TransactionService.create(data);
      await refetch();
      setIsModalOpen(false);
      toast.success('Transação registrada no Ledger com sucesso.');
    } catch (err) {
      console.error('[Frontend] Error saving transaction:', err);
      toast.error('Erro ao registrar transação no sistema.');
    }
  };

  if (loading || !summary) {
    return (
      <div className="flex items-center justify-center py-20">
        <Text className="animate-pulse text-lime-300 font-space-grotesk uppercase">
          SINCRONIZANDO_LEDGER...
        </Text>
      </div>
    );
  }

  const { balance, totalIncome, totalExpense, recentTransactions } = summary;

  return (
    <div className="flex flex-col gap-10">
      <LedgerHeader
        userName={userName}
        onNewTransaction={() => setIsModalOpen(true)}
      />

      <FinancialSummary
        balance={balance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      <RecentActivity transactions={recentTransactions} />

      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
