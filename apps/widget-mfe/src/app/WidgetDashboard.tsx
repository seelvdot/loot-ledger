'use client';

import React, { useState, useEffect } from 'react';
import { Button, Combobox } from '@core/evokit';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { WidgetConfig, HomeLayout } from './types';
import { fetchFromAPI } from './api';
import WidgetCardRenderer from './WidgetCardRenderer';
import WidgetModal from './WidgetModal';

// Widgets Pré-definidos (Presets)
const PRESET_WIDGETS: WidgetConfig[] = [
  {
    id: 'preset-gastos',
    name: 'GASTOS DO MÊS',
    type: 'NUMERIC',
    period: 'THIS_MONTH',
    filterType: 'EXPENSE',
    filterCategory: 'ALL',
    isPreset: true,
  },
  {
    id: 'preset-entradas',
    name: 'ENTRADAS DO MÊS',
    type: 'NUMERIC',
    period: 'THIS_MONTH',
    filterType: 'INCOME',
    filterCategory: 'ALL',
    isPreset: true,
  },
  {
    id: 'preset-grafico-gastos',
    name: 'GASTOS POR CATEGORIA',
    type: 'GRAPHIC',
    chartType: 'BAR',
    period: 'THIS_MONTH',
    filterType: 'EXPENSE',
    filterCategory: 'ALL',
    isPreset: true,
  },
  {
    id: 'preset-fluxo-caixa',
    name: 'HISTÓRICO FLUXO GERAL',
    type: 'GRAPHIC',
    chartType: 'AREA',
    period: 'THIS_MONTH',
    filterType: 'ALL',
    filterCategory: 'ALL',
    isPreset: true,
  },
];

const DEFAULT_LAYOUT: HomeLayout = {
  'slot-1': 'preset-gastos',
  'slot-2': 'preset-entradas',
  'slot-3': 'preset-grafico-gastos',
  'slot-4': null,
};

export default function WidgetDashboard() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [layout, setLayout] = useState<HomeLayout>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingWidget, setEditingWidget] = useState<WidgetConfig | null>(null);

  const handleEditWidgetClick = async (widget: WidgetConfig) => {
    setEditingWidget(widget);
    try {
      const cats = await fetchFromAPI<string[]>('/transactions/categories');
      const subs = await fetchFromAPI<string[]>('/transactions/subcategories');
      setCategories(cats);
      setSubcategories(subs);
    } catch (err) {
      console.error('Erro ao buscar categorias/subcategorias:', err);
      setCategories([]);
      setSubcategories([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWidget(null);
  };

  // Carregar dados no mount
  useEffect(() => {
    // 1. Carregar Widgets
    const savedWidgetsJson = localStorage.getItem('loot_ledger_widgets');
    if (savedWidgetsJson) {
      try {
        setWidgets(JSON.parse(savedWidgetsJson));
      } catch (e) {
        console.error(
          'Falha ao parsear widgets salvos, resetando para presets',
        );
        setWidgets(PRESET_WIDGETS);
      }
    } else {
      setWidgets(PRESET_WIDGETS);
      localStorage.setItem(
        'loot_ledger_widgets',
        JSON.stringify(PRESET_WIDGETS),
      );
    }

    // 2. Carregar Layout
    const savedLayoutJson = localStorage.getItem('loot_ledger_layout');
    if (savedLayoutJson) {
      try {
        setLayout(JSON.parse(savedLayoutJson));
      } catch (e) {
        console.error('Falha ao parsear layout salvo, resetando para padrao');
        setLayout(DEFAULT_LAYOUT);
      }
    } else {
      setLayout(DEFAULT_LAYOUT);
      localStorage.setItem(
        'loot_ledger_layout',
        JSON.stringify(DEFAULT_LAYOUT),
      );
    }

    // Ouvir novos registros de transações no host para atualizar os widgets automaticamente
    const handleTransactionSaved = () => {
      setRefreshTrigger((prev) => prev + 1);
    };
    window.addEventListener('transaction-saved', handleTransactionSaved);
    return () => {
      window.removeEventListener('transaction-saved', handleTransactionSaved);
    };
  }, []);

  // Buscar categorias ao abrir o modal
  const openWidgetCreatorModal = async () => {
    try {
      const cats = await fetchFromAPI<string[]>('/transactions/categories');
      const subs = await fetchFromAPI<string[]>('/transactions/subcategories');
      setCategories(cats);
      setSubcategories(subs);
    } catch (err) {
      console.error('Erro ao buscar categorias/subcategorias:', err);
      setCategories([]);
      setSubcategories([]);
    }
    setIsModalOpen(true);
  };

  const handleSaveWidget = (newWidgetData: Omit<WidgetConfig, 'id'>) => {
    if (editingWidget) {
      const updated = widgets.map((w) =>
        w.id === editingWidget.id ? { ...w, ...newWidgetData } : w,
      );
      setWidgets(updated);
      localStorage.setItem('loot_ledger_widgets', JSON.stringify(updated));
      setEditingWidget(null);
    } else {
      const newWidget: WidgetConfig = {
        ...newWidgetData,
        id: `widget-${Date.now()}`,
      };
      const updatedWidgets = [...widgets, newWidget];
      setWidgets(updatedWidgets);
      localStorage.setItem(
        'loot_ledger_widgets',
        JSON.stringify(updatedWidgets),
      );
    }
    setIsModalOpen(false);
  };

  const handleDeleteCustomWidget = (id: string) => {
    // 1. Remover da lista
    const updated = widgets.filter((w) => w.id !== id);
    setWidgets(updated);
    localStorage.setItem('loot_ledger_widgets', JSON.stringify(updated));

    // 2. Limpar dos slots ocupados
    const updatedLayout = { ...layout };
    let layoutChanged = false;
    Object.keys(updatedLayout).forEach((slotId) => {
      if (updatedLayout[slotId] === id) {
        updatedLayout[slotId] = null;
        layoutChanged = true;
      }
    });

    if (layoutChanged) {
      setLayout(updatedLayout);
      localStorage.setItem('loot_ledger_layout', JSON.stringify(updatedLayout));
    }
  };

  const handleAssignWidget = (slotId: string, widgetId: string) => {
    const updatedLayout = {
      ...layout,
      [slotId]: widgetId === 'empty' ? null : widgetId,
    };
    setLayout(updatedLayout);
    localStorage.setItem('loot_ledger_layout', JSON.stringify(updatedLayout));
  };

  const activeWidgetsInSlotsCount =
    Object.values(layout).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Toolbar do Painel de Widgets */}
      <div className="flex items-center justify-between px-1">
        <h3
          className="uppercase text-foreground font-bold text-lg font-space-grotesk"
          style={{ fontFamily: 'var(--font-header)' }}
        >
          {isEditing ? 'CONFIGURAR WIDGETS' : 'PAINEL DE CONTROLE'}
        </h3>

        <div className="flex items-center gap-3">
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={openWidgetCreatorModal}
              className="text-xs! flex items-center gap-1 border-primary/30"
            >
              <Plus size={12} />
              Criar Widget
            </Button>
          )}
          <Button
            variant={isEditing ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs! flex items-center gap-1.5"
          >
            <Settings size={12} />
            {isEditing ? 'Concluir' : 'Configurar Home'}
          </Button>
        </div>
      </div>

      {/* Grade de Slots (1x4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {['slot-1', 'slot-2', 'slot-3', 'slot-4'].map((slotId, index) => {
          const activeWidgetId = layout[slotId];
          const activeWidget = widgets.find((w) => w.id === activeWidgetId);
          const slotNum = index + 1;

          // Seletor rápido de widgets para o modo de edição
          const widgetOptions = [
            { value: 'empty', label: '[SLOT VAZIO]' },
            ...widgets.map((w) => ({
              value: w.id,
              label: w.name.replace(/_/g, ' '),
            })),
          ];

          if (isEditing) {
            return (
              <div
                key={slotId}
                className="border border-dashed border-border rounded-sm p-4 bg-card/10 flex flex-col justify-between relative h-[280px]"
              >
                <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-3">
                  <span className="text-[10px] font-mono text-primary/70 font-bold uppercase tracking-wider">
                    {`[BLOCO DE SLOT 0${slotNum}]`}
                  </span>
                  {activeWidget && !activeWidget.isPreset && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditWidgetClick(activeWidget)}
                        className="text-primary/60 hover:text-primary transition-colors text-[9px] font-mono uppercase flex items-center gap-1 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteCustomWidget(activeWidget.id)
                        }
                        className="text-rose-400/60 hover:text-rose-400 transition-colors text-[9px] font-mono uppercase flex items-center gap-1 cursor-pointer"
                        title="Excluir este widget permanentemente"
                      >
                        <Trash2 size={10} />
                        Excluir Widget
                      </button>
                    </div>
                  )}
                </div>

                <Combobox
                  value={activeWidgetId || 'empty'}
                  onChange={(val) => handleAssignWidget(slotId, val)}
                  options={widgetOptions}
                  label="Selecionar Widget para este bloco"
                />

                {activeWidget ? (
                  <div className="h-[170px] pointer-events-none opacity-80 mt-2">
                    <WidgetCardRenderer
                      widget={activeWidget}
                      isEditing={true}
                      refreshTrigger={refreshTrigger}
                    />
                  </div>
                ) : (
                  <div className="h-[170px] flex items-center justify-center border border-dashed border-border/20 rounded-sm bg-card/5 text-center p-4">
                    <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                      Nenhum widget selecionado
                    </span>
                  </div>
                )}
              </div>
            );
          }

          // Se não estiver editando e o slot estiver vazio, renderiza um placeholder de mesma altura
          if (!activeWidget) {
            return (
              <div
                key={slotId}
                className="h-[210px] border border-dashed border-border/40 rounded-sm flex flex-col items-center justify-center bg-card/20 text-center p-4"
              >
                <span className="text-[10px] text-muted-foreground/30 font-mono uppercase tracking-widest">
                  [SLOT VAZIO]
                </span>
              </div>
            );
          }

          return (
            <div key={slotId} className="h-[210px]">
              <WidgetCardRenderer
                widget={activeWidget}
                isEditing={false}
                refreshTrigger={refreshTrigger}
              />
            </div>
          );
        })}
      </div>

      {/* Estado vazio global (Se todos os slots forem nulos) */}
      {!isEditing && activeWidgetsInSlotsCount === 0 && (
        <div className="border border-dashed border-border/40 rounded-sm p-12 text-center bg-card/20">
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-mono mb-4 p-8">
            [NENHUM WIDGET ATIVO NA TELA INICIAL]
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="border-border text-xs!"
          >
            Adicionar Widgets para Configurar Painel
          </Button>
        </div>
      )}

      {/* Modal de Criação de Widget Customizado */}
      <WidgetModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveWidget}
        categories={categories}
        subcategories={subcategories}
        editingWidget={editingWidget}
      />
    </div>
  );
}
