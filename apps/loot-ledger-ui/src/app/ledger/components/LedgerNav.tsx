'use client';

import { Dropdown, DropdownItem, DropdownLabel } from '@core/evokit';
import { UserHexagon } from '@mynaui/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import { ThemeToggle } from '../../../components/ThemeToggle';

const menuItems = [
  { name: 'Ledger', href: '/ledger', label: 'Ledger' },
  { name: 'Transactions', href: '/ledger/transactions', label: 'Transações' },
];

/**
 * LedgerNav — Client Component
 *
 * Separado do layout principal para manter o ledger/layout.tsx como Server Component.
 * Contém toda a lógica interativa da navegação (usePathname, useAuth, logout).
 */
export function LedgerNav() {
  const pathname = usePathname();
  const session = useAuth();

  const handleLogout = async () => {
    await session.logout();
  };

  const currentPage = menuItems.find((item) => item.href === pathname);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border flex justify-between items-center px-6 py-4 font-space-grotesk gap-10">
        <h1
          className="font-bold text-lg text-primary uppercase"
          style={{ fontFamily: 'var(--font-header)' }}
        >
          Loot Ledger
        </h1>
        <ul className="flex-1 flex gap-6">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`uppercase text-sm font-medium transition-colors duration-300 ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{ fontFamily: 'var(--font-header)' }}
            >
              <Link href={item.href}>
                {pathname === item.href ? '> ' : ''} {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Dropdown
            align="right"
            trigger={
              <UserHexagon
                size={28}
                strokeWidth={2}
                className="text-primary/75 hover:text-primary transition-colors duration-300 cursor-pointer"
              />
            }
          >
            <DropdownLabel>Minha Conta</DropdownLabel>
            <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
          </Dropdown>
        </div>
      </nav>

      {/* Header da seção atual */}
      <header className="mb-10 border-l-3 border-primary pl-3">
        <span
          className="text-primary text-[10px] uppercase block mb-1"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          [ACTIVE SESSION]
        </span>
        <h2
          className="text-foreground uppercase font-bold text-2xl"
          style={{ fontFamily: 'var(--font-header)' }}
        >
          {currentPage?.label ?? 'Ledger'}
        </h2>
      </header>
    </>
  );
}
