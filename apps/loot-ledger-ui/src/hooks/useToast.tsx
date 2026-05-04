'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, Info, Danger, X } from '@mynaui/icons-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
    warning: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const toast = {
    success: (msg: string) => addToast(msg, 'success'),
    error: (msg: string) => addToast(msg, 'error'),
    info: (msg: string) => addToast(msg, 'info'),
    warning: (msg: string) => addToast(msg, 'warning'),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer
        toasts={toasts}
        removeToast={(id) =>
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }
      />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`
            pointer-events-auto flex items-center gap-3 p-4 min-w-[300px]
            bg-neutral-900/90 backdrop-blur-xl border-l-4 
            animate-in slide-in-from-right-full duration-300
            ${t.type === 'success' ? 'border-lime-400' : ''}
            ${t.type === 'error' ? 'border-red-400' : ''}
            ${t.type === 'warning' ? 'border-amber-400' : ''}
            ${t.type === 'info' ? 'border-blue-400' : ''}
          `}
        >
          <div
            className={`
            ${t.type === 'success' ? 'text-lime-400' : ''}
            ${t.type === 'error' ? 'text-red-400' : ''}
            ${t.type === 'warning' ? 'text-amber-400' : ''}
            ${t.type === 'info' ? 'text-blue-400' : ''}
          `}
          >
            {t.type === 'success' && <CheckCircle size={20} />}
            {t.type === 'error' && <X size={20} />}
            {t.type === 'warning' && <Danger size={20} />}
            {t.type === 'info' && <Info size={20} />}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] uppercase font-space-grotesk tracking-widest text-neutral-500">
              {t.type === 'success'
                ? 'NOTIFICACAO_SISTEMA // OK'
                : 'ALERTA_SISTEMA'}
            </p>
            <p className="text-sm font-space-grotesk text-neutral-100">
              {t.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="ml-auto text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
}
