'use client';

import { Avatar, LNavbar } from '@loot-ledger/ui';
import { DropdownMenu, Heading, Text } from '@radix-ui/themes';
import { UserHexagon } from '@mynaui/icons-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const session = useAuth();

  const menuItems = [
    { name: 'Ledger', href: '/ledger', label: 'Ledger' },
    {
      name: 'Transactions',
      href: '/ledger/transactions',
      label: 'Transações',
    },
  ];

  const handleLogout = async () => {
    await session.logout();
  };

  return (
    <>
      <LNavbar
        itens={menuItems}
        rightContent={
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <UserHexagon
                size={28}
                strokeWidth={2}
                className="text-lime-400/75 hover:text-lime-400 transition-colors duration-300"
              ></UserHexagon>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="1" className="backdrop-blur-md">
              <DropdownMenu.Label className="font-space-grotesk uppercase text-sm text-neutral-300 p-2 font-medium pb-3 border-b border-neutral-400/50 mb-2">
                Minha Conta
              </DropdownMenu.Label>
              <DropdownMenu.Item
                className="flex justify-center font-space-grotesk uppercase text-sm p-2 font-medium group text-neutral-400"
                onClick={handleLogout}
              >
                Sair
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        }
      />
      <main className="py-6 container">
        <header className="mb-10 border-l-3 border-lime-300 pl-3">
          <Text className="text-lime-300 text-[10px] uppercase font-space-grotesk">
            [active_session]
          </Text>
          <Heading className="text-neutral-100 uppercase font-space-grotesk!">
            {menuItems.find((item) => item.href === pathname)?.label}
          </Heading>
        </header>
        <section className="">{children}</section>
      </main>
    </>
  );
}
