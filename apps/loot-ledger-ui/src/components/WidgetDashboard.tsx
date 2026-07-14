'use client';

/**
 * WidgetDashboard — Microfrontend via Module Federation (Runtime API)
 *
 * Usa @module-federation/enhanced Runtime API para carregar o remote
 * widget_mfe em tempo de execução (somente no browser), evitando qualquer
 * conflito com a compilação SSR do Next.js 16 App Router.
 *
 * Fluxo:
 *   1. init()      → registra o remote e configura módulos compartilhados
 *   2. loadRemote() → busca o mf-manifest.json de localhost:4200,
 *                     injeta o script e retorna o módulo exposto
 */

import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { init, loadRemote } from '@module-federation/enhanced/runtime';

// Inicializa uma única vez (singleton guard)
let mfInitialized = false;

function ensureMFInit() {
  if (typeof window !== 'undefined') {
    (window as any).React = React;
    (window as any).ReactDOM = ReactDOM;
  }

  if (mfInitialized) return;
  mfInitialized = true;

  init({
    name: 'host_nextjs',
    remotes: [
      {
        name: 'widgetMfe',
        // O Nx expõe o mf-manifest.json gerado pelo ModuleFederationPlugin
        entry: process.env.NEXT_PUBLIC_WIDGET_MFE_URL || 'http://localhost:4200/mf-manifest.json',
        alias: 'widgetMfe',
      },
    ],
    shared: {
      react: {
        version: React.version,
        scope: 'default',
        lib: () => React,
        shareConfig: { singleton: true, requiredVersion: false },
      },
      'react-dom': {
        version: ReactDOM.version,
        scope: 'default',
        lib: () => ReactDOM,
        shareConfig: { singleton: true, requiredVersion: false },
      },
    },
  });
}

export default function WidgetDashboard() {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>(
    'loading',
  );
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    ensureMFInit();

    loadRemote<{ default: React.ComponentType }>('widgetMfe/WidgetDashboard')
      .then((mod) => {
        const Comp = mod?.default ?? (mod as unknown as React.ComponentType);
        setComponent(() => Comp);
        setStatus('ready');
      })
      .catch((err) => {
        console.error(
          '[MFE] Falha ao carregar widgetMfe/WidgetDashboard:',
          err,
        );
        setStatus('error');
      });
  }, []);

  if (status === 'loading') {
    return (
      <div className="border border-lime-300/10 rounded-sm p-8 text-center bg-neutral-900/10">
        <span className="text-xs text-lime-300/50 font-mono uppercase tracking-widest animate-pulse">
          [CARREGANDO_PAINEL_WIDGETS...]
        </span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="border border-rose-500/20 rounded-sm p-8 text-center bg-rose-950/5">
        <span className="text-xs text-rose-400/80 font-mono uppercase tracking-widest">
          [PAINEL_WIDGETS :: OFFLINE — verifique se o micro-frontend está ativo
          na porta 4200]
        </span>
      </div>
    );
  }

  return Component ? <Component /> : null;
}
