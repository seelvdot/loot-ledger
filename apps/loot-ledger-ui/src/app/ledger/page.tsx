'use client';

import { useEffect, useState } from 'react';
import { useTransactionStore } from '../../store/useTransactionStore';
import { Text } from '@radix-ui/themes';
import TransactionModal from '../../components/TransactionModal';
import { useAuth } from '../../hooks/useAuth';
import { LedgerHeader } from './components/LedgerHeader';
import { FinancialSummary } from './components/FinancialSummary';
import { RecentActivity } from './components/RecentActivity';
import { useToast } from '../../hooks/useToast';
import WidgetDashboard from '../../components/WidgetDashboard';

export default function LedgerPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { summary, loading, fetchSummary, createTransaction } =
    useTransactionStore();

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const userName = user?.email ? user.email.split('@')[0] : 'Operador';

  const handleSave = async (data: any) => {
    try {
      await createTransaction(data);
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
          SINCRONIZANDO LEDGER...
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Coluna da esquerda (menor): Saldo, Entradas, Saídas */}
        <div className="lg:col-span-3 lg:sticky lg:top-[90px] self-start">
          <div className="flex justify-between items-center px-1 mb-4">
            <h3
              className="uppercase text-foreground font-bold text-lg"
              style={{ fontFamily: 'var(--font-header)' }}
            >
              RESUMO FINANCEIRO
            </h3>
          </div>
          <FinancialSummary
            balance={balance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            className="flex flex-col gap-6 font-space-grotesk"
          />
        </div>

        {/* Coluna da direita (segunda coluna, maior): Widgets e Últimas Transações */}
        <div className="lg:col-span-9 flex flex-col gap-10">
          <WidgetDashboard />
          <RecentActivity transactions={recentTransactions} />
        </div>
      </div>

      {isModalOpen && (
        <TransactionModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
