import { Metadata } from 'next';
import { Suspense } from 'react';
import { LedgerNav } from './components/LedgerNav';

export const metadata: Metadata = {
  title: 'Ledger',
  description:
    'Painel financeiro do Loot Ledger. Visualize seu saldo, entradas, saídas e widgets customizados.',
  robots: {
    index: false, // Área autenticada — não indexar
    follow: false,
  },
};

// Skeleton exibido enquanto o conteúdo carrega via Suspense (Streaming SSR)
function PageSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-8 w-48 bg-secondary rounded-sm" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 h-64 bg-secondary rounded-sm" />
        <div className="col-span-9 space-y-4">
          <div className="h-40 bg-secondary rounded-sm" />
          <div className="h-64 bg-secondary rounded-sm" />
        </div>
      </div>
    </div>
  );
}

// Server Component — sem 'use client'
export default function LedgerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* LedgerNav é Client Component (usePathname, useAuth) */}
      <LedgerNav />
      <main className="py-6 container">
        {/* Suspense permite streaming SSR: o shell é enviado imediatamente,
            o conteúdo é transmitido assim que os dados ficam prontos */}
        <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
      </main>
    </>
  );
}

