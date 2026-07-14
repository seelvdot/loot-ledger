'use client';

import React from 'react';
import { Modal, Button, InputField, Combobox } from '@core/evokit';
import { WidgetConfig } from './types';

interface WidgetModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (widget: Omit<WidgetConfig, 'id'>) => void;
  categories: string[];
  subcategories: string[];
  editingWidget?: WidgetConfig | null;
}

export default function WidgetModal({
  open,
  onClose,
  onSave,
  categories,
  subcategories,
  editingWidget = null,
}: WidgetModalProps) {
  const [formName, setFormName] = React.useState('');
  const [formType, setFormType] = React.useState<'NUMERIC' | 'GRAPHIC'>(
    'NUMERIC',
  );
  const [formChartType, setFormChartType] = React.useState<
    'BAR' | 'LINE' | 'AREA'
  >('BAR');
  const [formPeriod, setFormPeriod] =
    React.useState<WidgetConfig['period']>('THIS_MONTH');
  const [formFilterType, setFormFilterType] =
    React.useState<WidgetConfig['filterType']>('ALL');
  const [formFilterCategory, setFormFilterCategory] = React.useState('ALL');
  const [formFilterSubcategory, setFormFilterSubcategory] =
    React.useState('ALL');
  const [formError, setFormError] = React.useState('');

  React.useEffect(() => {
    if (editingWidget) {
      setFormName(editingWidget.name);
      setFormType(editingWidget.type);
      setFormChartType(editingWidget.chartType || 'BAR');
      setFormPeriod(editingWidget.period);
      setFormFilterType(editingWidget.filterType);
      setFormFilterCategory(editingWidget.filterCategory);
      setFormFilterSubcategory(editingWidget.filterSubcategory || 'ALL');
    } else {
      setFormName('');
      setFormType('NUMERIC');
      setFormChartType('BAR');
      setFormPeriod('THIS_MONTH');
      setFormFilterType('ALL');
      setFormFilterCategory('ALL');
      setFormFilterSubcategory('ALL');
    }
    setFormError('');
  }, [open, editingWidget]);

  const handleSave = () => {
    if (!formName.trim()) {
      setFormError('CAMPO OBRIGATÓRIO');
      return;
    }

    onSave({
      name: formName.toUpperCase().trim(),
      type: formType,
      period: formPeriod,
      filterType: formFilterType,
      filterCategory: formFilterCategory,
      filterSubcategory: formFilterSubcategory,
      ...(formType === 'GRAPHIC' && { chartType: formChartType }),
    });

    // Reset form states
    setFormName('');
    setFormType('NUMERIC');
    setFormChartType('BAR');
    setFormPeriod('THIS_MONTH');
    setFormFilterType('ALL');
    setFormFilterCategory('ALL');
    setFormFilterSubcategory('ALL');
    setFormError('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingWidget ? 'Editar Widget' : 'Criar Widget Personalizado'}
    >
      <div className="space-y-4 font-space-grotesk">
        <div className="border-l-2 border-primary pl-4 mb-4">
          <span
            className="text-primary text-[10px] uppercase block"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [WIDGET CREATOR MODULE]
          </span>
        </div>

        <InputField
          label="NOME DO WIDGET"
          placeholder="EX: MEUS GASTOS COM COMIDA"
          value={formName}
          onChange={(e) => {
            setFormName(e.target.value);
            if (formError) setFormError('');
          }}
          error={formError ? 'CAMPO OBRIGATÓRIO' : ''}
        />

        <div className="grid grid-cols-2 gap-4">
          <Combobox
            label="TIPO DE EXIBIÇÃO"
            value={formType}
            onChange={(val) => setFormType(val as any)}
            options={[
              { value: 'NUMERIC', label: 'VALOR NUMÉRICO' },
              { value: 'GRAPHIC', label: 'EIXO GRÁFICO' },
            ]}
          />

          {formType === 'GRAPHIC' ? (
            <Combobox
              label="MODELO DO GRÁFICO"
              value={formChartType}
              onChange={(val) => setFormChartType(val as any)}
              options={[
                { value: 'BAR', label: 'BARRAS' },
                { value: 'LINE', label: 'LINHAS' },
                { value: 'AREA', label: 'ÁREA PREENCHIDA' },
              ]}
            />
          ) : (
            <div className="opacity-40 select-none">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest font-space-grotesk block mb-1">
                MODELO DO GRÁFICO
              </label>
              <div className="border border-border bg-input-background px-3 py-2 text-sm text-muted-foreground">
                NÃO APLICÁVEL
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Combobox
            label="PERÍODO DE DADOS"
            value={formPeriod}
            onChange={(val) => setFormPeriod(val as any)}
            options={[
              { value: '7_DAYS', label: 'ÚLTIMOS 7 DIAS' },
              { value: '30_DAYS', label: 'ÚLTIMOS 30 DIAS' },
              { value: 'THIS_MONTH', label: 'ESTE MÊS' },
              { value: 'ALL_TIME', label: 'TODO O REGISTRO' },
            ]}
          />

          <Combobox
            label="TIPO DE TRANSAÇÃO"
            value={formFilterType}
            onChange={(val) => setFormFilterType(val as any)}
            options={[
              { value: 'ALL', label: 'TODAS (ENTRADAS/SAÍDAS)' },
              { value: 'INCOME', label: 'APENAS ENTRADAS' },
              { value: 'EXPENSE', label: 'APENAS SAÍDAS' },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Combobox
            label="FILTRAR POR CATEGORIA"
            value={formFilterCategory}
            onChange={setFormFilterCategory}
            options={[
              { value: 'ALL', label: 'TODAS AS CATEGORIAS' },
              ...categories.map((cat) => ({
                value: cat,
                label: cat.toUpperCase(),
              })),
            ]}
          />

          <Combobox
            label="FILTRAR POR SUBCATEGORIA"
            value={formFilterSubcategory}
            onChange={setFormFilterSubcategory}
            options={[
              { value: 'ALL', label: 'TODAS AS SUBCATEGORIAS' },
              ...subcategories.map((sub) => ({
                value: sub,
                label: sub.toUpperCase(),
              })),
            ]}
          />
        </div>

        <div className="flex gap-4 pt-4 justify-end border-t border-border/50">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingWidget ? 'Salvar Alterações' : 'Salvar Widget'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
