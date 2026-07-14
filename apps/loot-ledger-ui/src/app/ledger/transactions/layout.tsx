import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transações',
  description:
    'Gerencie todas as suas transações financeiras. Filtre, busque, edite e adicione novos registros no Loot Ledger.',
  robots: {
    index: false, // Área autenticada — não indexar
    follow: false,
  },
};

// Server Component — metadata para a sub-rota /ledger/transactions
export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
