import '@radix-ui/themes/styles.css';
import './global.css';

import { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ToastProvider } from '../hooks/useToast';
import { ThemeProvider } from '../components/ThemeProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Loot Ledger // Terminal Operations',
    template: '%s // Loot Ledger',
  },
  description:
    'Sistema de gerenciamento financeiro com estética Hacker/Terminal. Controle suas finanças com precisão e estilo.',
  keywords: [
    'finanças',
    'ledger',
    'controle financeiro',
    'dashboard',
    'terminal',
    'hacker',
  ],
  authors: [{ name: 'Loot Ledger Team' }],
  robots: {
    index: true,
    follow: false,
    googleBot: { index: true, follow: false },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Loot Ledger',
    title: 'Loot Ledger // Terminal Operations',
    description:
      'Sistema de gerenciamento financeiro com estética Hacker/Terminal.',
  },
  twitter: {
    card: 'summary',
    title: 'Loot Ledger // Terminal Operations',
    description:
      'Sistema de gerenciamento financeiro com estética Hacker/Terminal.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body className="transition-colors duration-200">
        <ToastProvider>
          <ThemeProvider>
            <div className="vhs-overlay">
              <div className="item item--red"></div>
              <div className="item item--green"></div>
              <div className="item item--blue"></div>
            </div>
            {children}
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
