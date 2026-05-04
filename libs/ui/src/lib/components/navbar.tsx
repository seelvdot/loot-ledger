'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LNavbarProps {
  itens: NavbarItem[];
  rightContent?: React.ReactNode;
}

export interface NavbarItem {
  name: string;
  href: string;
  label: string;
}

export function LNavbar({ itens, rightContent }: LNavbarProps) {
  const pathname = usePathname();
  // const [activeRoute, setActiveRoute] = useState(pathname);
  console.log(pathname);
  return (
    <nav className="border-b border-lime-300 flex justify-between items-center px-6 py-4 font-space-grotesk gap-10">
      <h1 className="font-bold text-lg text-lime-300 uppercase">Loot_Ledger</h1>
      <ul className="flex-1 flex gap-6">
        {itens.map((item) => (
          <li
            key={item.name}
            className={`uppercase text-sm text-lime-300/35 hover:text-lime-300/75 font-medium transition-colors duration-300 ${pathname === item.href ? 'text-lime-300/75' : ''}`}
          >
            <Link href={item.href}>
              {pathname === item.href ? '>_' : ''} {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {rightContent}
    </nav>
  );
}
