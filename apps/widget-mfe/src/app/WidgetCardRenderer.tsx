'use client';

import React, { useState, useEffect } from 'react';
import { Card, cn } from '@core/evokit';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from 'recharts';
import { WidgetConfig } from './types';
import { fetchFromAPI } from './api';

// Tooltip customizado para os gráficos recharts (Estilo cyberpunk/retro)
function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="bg-card border border-border px-2.5 py-1.5 shadow-2xl rounded-sm text-[10px] pointer-events-none"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <p className="text-muted-foreground/60 mb-0.5 uppercase tracking-wider text-[8px]">
        {label}
      </p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-foreground/90 font-semibold">
          R${' '}
          {Number(p.value).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ))}
    </div>
  );
}

export default function WidgetCardRenderer({
  widget,
  isEditing,
  refreshTrigger,
}: {
  widget: WidgetConfig;
  isEditing: boolean;
  refreshTrigger: number;
}) {
  const [data, setData] = useState<{ value?: number; data?: any[] } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const params = new URLSearchParams();
    params.append('period', widget.period);
    params.append('type', widget.filterType);
    params.append('category', widget.filterCategory);
    if (widget.filterSubcategory) {
      params.append('subcategory', widget.filterSubcategory);
    }
    params.append('widgetType', widget.type);

    fetchFromAPI<{ value?: number; data?: any[] }>(
      `/transactions/widget-query?${params.toString()}`,
    )
      .then((res) => {
        if (active) {
          setData(res);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.error('Erro ao buscar dados do widget:', err);
          setError('ERRO BUSCA API');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [widget, refreshTrigger]);

  const getPeriodLabel = (p: string) => {
    switch (p) {
      case '7_DAYS':
        return 'ÚLTIMOS 7 DIAS';
      case '30_DAYS':
        return 'ÚLTIMOS 30 DIAS';
      case 'THIS_MONTH':
        return 'ESTE MÊS';
      default:
        return 'TODO O PERÍODO';
    }
  };

  const getFilterDesc = () => {
    let desc =
      widget.filterType === 'INCOME'
        ? 'ENTRADAS'
        : widget.filterType === 'EXPENSE'
          ? 'SAÍDAS'
          : 'FLUXO';
    if (widget.filterCategory !== 'ALL') {
      desc += ` [${widget.filterCategory.toUpperCase()}]`;
    }
    return desc;
  };

  const cardHeight = isEditing ? 'h-[170px]' : 'h-[210px]';

  if (loading) {
    return (
      <Card
        className={cn(
          cardHeight,
          'flex items-center justify-center border-primary/10',
        )}
      >
        <span className="text-[10px] text-primary/40 font-mono tracking-widest animate-pulse uppercase">
          [CARREGANDO DADOS...]
        </span>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        className={cn(
          cardHeight,
          'flex flex-col justify-center items-center text-center p-4 border-rose-500/20 bg-rose-950/10',
        )}
      >
        <span className="text-rose-400 font-mono text-[10px] uppercase font-bold tracking-widest mb-1">
          [ERRO DE CONEXÃO]
        </span>
        <span className="text-[9px] text-rose-300/60 uppercase">
          Falha ao computar dados
        </span>
      </Card>
    );
  }

  const isExpense = widget.filterType === 'EXPENSE';
  const isIncome = widget.filterType === 'INCOME';

  return (
    <Card
      className={cn(
        cardHeight,
        'flex flex-col justify-between border-border bg-card font-space-grotesk p-4 relative overflow-hidden select-none',
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2 mb-3">
          <span className="text-xs font-bold text-foreground font-space-grotesk tracking-widest uppercase">
            {widget.name.replace(/_/g, ' ')}
          </span>
          <span className="text-[9px] text-muted-foreground font-mono px-1.5 py-0.5 bg-secondary border border-border">
            {widget.type}
          </span>
        </div>
      </div>

      {widget.type === 'NUMERIC' ? (
        <div className="flex-1 flex flex-col justify-center py-2">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-muted-foreground font-mono">R$</span>
            <span
              className={`text-2xl font-bold tracking-tight font-mono ${
                isIncome
                  ? 'text-primary'
                  : isExpense
                    ? 'text-rose-400'
                    : 'text-foreground'
              }`}
            >
              {data?.value?.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) ?? '0,00'}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full min-h-[100px] pt-1">
          {data?.data && data.data.length > 0 ? (
            <ResponsiveContainer width="100%" height={100}>
              {widget.chartType === 'BAR' ? (
                <BarChart data={data.data}>
                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 7,
                      fill: 'oklch(0.55 0 0)',
                      fontFamily: 'var(--font-mono)',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartTooltip
                    content={<ChartTip />}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                  />
                  <Bar
                    dataKey="value"
                    fill={isExpense ? 'oklch(0.58 0.21 25)' : 'var(--primary)'}
                    fillOpacity={0.8}
                    radius={0}
                  />
                </BarChart>
              ) : widget.chartType === 'LINE' ? (
                <LineChart data={data.data}>
                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 7,
                      fill: 'oklch(0.55 0 0)',
                      fontFamily: 'var(--font-mono)',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartTooltip content={<ChartTip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      isExpense ? 'oklch(0.58 0.21 25)' : 'var(--primary)'
                    }
                    strokeWidth={1.5}
                    dot={{ r: 1 }}
                  />
                </LineChart>
              ) : (
                <AreaChart data={data.data}>
                  <defs>
                    <linearGradient
                      id={`grad-${widget.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={
                          isExpense ? 'oklch(0.58 0.21 25)' : 'var(--primary)'
                        }
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor={
                          isExpense ? 'oklch(0.58 0.21 25)' : 'var(--primary)'
                        }
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 7,
                      fill: 'oklch(0.55 0 0)',
                      fontFamily: 'var(--font-mono)',
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartTooltip content={<ChartTip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={
                      isExpense ? 'oklch(0.58 0.21 25)' : 'var(--primary)'
                    }
                    strokeWidth={1.5}
                    fill={`url(#grad-${widget.id})`}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center border border-dashed border-border py-6">
              <span className="text-[9px] text-muted-foreground uppercase font-mono">
                [NENHUMA TRANSAÇÃO NO FILTRO]
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-2">
        <span className="text-[8px] text-muted-foreground font-mono tracking-wider">
          {getPeriodLabel(widget.period)}
        </span>
        <span className="text-[8px] text-muted-foreground/80 font-mono tracking-wider">
          {getFilterDesc()}
        </span>
      </div>
    </Card>
  );
}
