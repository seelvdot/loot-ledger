export interface WidgetConfig {
  id: string;
  name: string;
  type: 'NUMERIC' | 'GRAPHIC';
  chartType?: 'BAR' | 'LINE' | 'AREA';
  period: '7_DAYS' | '30_DAYS' | 'THIS_MONTH' | 'ALL_TIME';
  filterType: 'ALL' | 'INCOME' | 'EXPENSE';
  filterCategory: string; // 'ALL' ou categoria específica
  filterSubcategory?: string; // 'ALL' ou subcategoria específica
  isPreset?: boolean;
}

export interface HomeLayout {
  [slotId: string]: string | null; // slotId -> widgetId
}
