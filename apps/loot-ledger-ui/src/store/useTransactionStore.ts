import { create } from 'zustand';
import { Transaction } from '../types/transaction';
import { TransactionService, TransactionFilters } from '../services/transaction.service';

interface TransactionState {
  transactions: Transaction[];
  totalTransactions: number;
  summary: {
    balance: number;
    totalIncome: number;
    totalExpense: number;
    recentTransactions: Transaction[];
  } | null;
  categories: string[];
  subcategories: string[];
  filters: TransactionFilters;
  loading: boolean;
  
  setFilters: (filters: Partial<TransactionFilters>) => void;
  fetchTransactions: () => Promise<void>;
  fetchSummary: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSubcategories: () => Promise<void>;
  createTransaction: (data: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  totalTransactions: 0,
  summary: null,
  categories: [],
  subcategories: [],
  filters: {
    page: 1,
    limit: 10,
    search: '',
    type: undefined,
    sortBy: 'date',
    order: 'DESC',
  },
  loading: false,

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().fetchTransactions();
  },

  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const response = await TransactionService.getAll(get().filters);
      set({
        transactions: response.data,
        totalTransactions: response.total,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      set({ loading: false });
    }
  },

  fetchSummary: async () => {
    try {
      const summary = await TransactionService.getSummary();
      set({ summary });
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  },

  fetchCategories: async () => {
    try {
      const categories = await TransactionService.getCategories();
      set({ categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },

  fetchSubcategories: async () => {
    try {
      const subcategories = await TransactionService.getSubcategories();
      set({ subcategories });
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  },

  createTransaction: async (data) => {
    set({ loading: true });
    try {
      await TransactionService.create(data);
      await get().fetchTransactions();
      await get().fetchSummary();
      await get().fetchCategories();
      await get().fetchSubcategories();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('transaction-saved'));
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      set({ loading: false });
      throw error;
    }
  },

  updateTransaction: async (id, data) => {
    set({ loading: true });
    try {
      await TransactionService.update(id, data);
      await get().fetchTransactions();
      await get().fetchSummary();
      await get().fetchCategories();
      await get().fetchSubcategories();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('transaction-saved'));
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
      set({ loading: false });
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    set({ loading: true });
    try {
      await TransactionService.delete(id);
      await get().fetchTransactions();
      await get().fetchSummary();
      await get().fetchCategories();
      await get().fetchSubcategories();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('transaction-saved'));
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      set({ loading: false });
      throw error;
    }
  },
}));
