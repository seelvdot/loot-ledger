import '@radix-ui/themes/styles.css';
import './global.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loot Ledger // Terminal Operations',
  description:
    'Sistema de gerenciamento financeiro com estética Hacker/Terminal.',
  keywords: ['finanças', 'ledger', 'hacker', 'terminal', 'fiap', 'ops'],
};

import { ToastProvider } from '../hooks/useToast';
import { ThemeProvider } from '../components/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
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
