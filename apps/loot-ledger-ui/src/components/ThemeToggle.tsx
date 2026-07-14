'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from '@core/evokit';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-foreground hover:bg-secondary/50 focus-visible:ring-1 focus-visible:ring-ring rounded-none"
      title={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      {theme === 'dark' ? (
        <Sun className="h-[18px] w-[18px] text-primary transition-transform duration-300" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-primary transition-transform duration-300" />
      )}
    </Button>
  );
}
