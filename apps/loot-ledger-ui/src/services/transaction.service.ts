import { Transaction } from '../types/transaction';
import { apiService } from './api.service';

export interface TransactionFilters {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
}

export class TransactionService {
  static async getAll(filters?: TransactionFilters): Promise<PaginatedResponse<Transaction>> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.order) params.append('order', filters.order);

    const queryString = params.toString();
    const endpoint = `/transactions${queryString ? `?${queryString}` : ''}`;
    
    return apiService.get<PaginatedResponse<Transaction>>(endpoint);
  }

  static async getSummary(): Promise<{
    balance: number;
    totalIncome: number;
    totalExpense: number;
    recentTransactions: Transaction[];
  }> {
    return apiService.get('/transactions/summary');
  }

  static async create(data: Omit<Transaction, 'id'>): Promise<Transaction> {
    return apiService.post<Transaction>('/transactions', data);
  }

  static async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    return apiService.patch<Transaction>(`/transactions/${id}`, data);
  }

  static async delete(id: string): Promise<boolean> {
    return apiService.delete<boolean>(`/transactions/${id}`);
  }

  static async getCategories(): Promise<string[]> {
    return apiService.get<string[]>('/transactions/categories');
  }

  static async getSubcategories(): Promise<string[]> {
    return apiService.get<string[]>('/transactions/subcategories');
  }
}
