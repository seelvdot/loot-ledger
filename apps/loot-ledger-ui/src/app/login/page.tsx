import { Metadata } from 'next';
import { LoginForm } from './LoginForm';

// Gerado em build-time como página estática (SSG) — sem dados dinâmicos
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Entrar',
  description:
    'Acesse o Loot Ledger com suas credenciais e gerencie suas finanças com segurança.',
  robots: {
    index: true,
    follow: false,
  },
  openGraph: {
    title: 'Entrar // Loot Ledger',
    description: 'Acesse o Loot Ledger com suas credenciais.',
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
