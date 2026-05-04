import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: string;
  observations?: string;
  createdAt: string;
}

@Injectable()
export class TransactionsService {
  private transactionsByUser = new Map<string, Transaction[]>();

  findAll(
    userId: string,
    filters?: {
      search?: string;
      type?: string;
      page?: number;
      limit?: number;
      sortBy?: string;
      order?: 'ASC' | 'DESC';
    },
  ) {
    let transactions = this.transactionsByUser.get(userId) || [];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      transactions = transactions.filter((t) =>
        t.description.toLowerCase().includes(search),
      );
    }

    if (filters?.type && filters.type !== 'ALL') {
      transactions = transactions.filter((t) => t.type === filters.type);
    }

    const sortBy = (filters?.sortBy || 'date') as keyof Transaction;
    const order = (filters?.order || 'DESC').toUpperCase();

    transactions = [...transactions].sort((a, b) => {
      let valA: any = a[sortBy];
      let valB: any = b[sortBy];

      if (sortBy === 'date') {
        const timeA = new Date(valA).getTime();
        const timeB = new Date(valB).getTime();

        if (timeA !== timeB) {
          return order === 'ASC' ? timeA - timeB : timeB - timeA;
        }

        return order === 'ASC'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortBy === 'amount') {
        valA = Number(valA);
        valB = Number(valB);
      }

      if (valA < valB) return order === 'ASC' ? -1 : 1;
      if (valA > valB) return order === 'ASC' ? 1 : -1;
      return 0;
    });

    const total = transactions.length;

    const pageStr = filters?.page?.toString();
    const limitStr = filters?.limit?.toString();

    const page = pageStr ? parseInt(pageStr, 10) : 1;
    const limit = limitStr ? parseInt(limitStr, 10) : 10;

    const validPage = isNaN(page) || page < 1 ? 1 : page;
    const validLimit = isNaN(limit) || limit < 1 ? 10 : limit;

    const start = (validPage - 1) * validLimit;
    const data = transactions.slice(start, start + validLimit);

    return {
      data,
      total,
      page: validPage,
    };
  }

  create(
    userId: string,
    data: Omit<Transaction, 'id' | 'createdAt'>,
  ): Transaction {
    const userTransactions = this.transactionsByUser.get(userId) || [];
    const newTransaction: Transaction = {
      ...data,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    userTransactions.push(newTransaction);
    this.transactionsByUser.set(userId, userTransactions);
    return newTransaction;
  }

  update(
    userId: string,
    id: string,
    data: Partial<Transaction>,
  ): Transaction | null {
    const userTransactions = this.transactionsByUser.get(userId) || [];
    const index = userTransactions.findIndex((t) => t.id === id);
    if (index === -1) return null;

    userTransactions[index] = { ...userTransactions[index], ...data };
    this.transactionsByUser.set(userId, userTransactions);
    return userTransactions[index];
  }

  remove(userId: string, id: string): boolean {
    const userTransactions = this.transactionsByUser.get(userId) || [];
    const index = userTransactions.findIndex((t) => t.id === id);
    if (index === -1) return false;

    userTransactions.splice(index, 1);
    this.transactionsByUser.set(userId, userTransactions);
    return true;
  }

  getSummary(userId: string) {
    const transactions = this.transactionsByUser.get(userId) || [];

    const totalIncome = transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const recentTransactions = [...transactions]
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        if (dateA !== dateB) return dateB - dateA;

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .slice(0, 5);

    return {
      balance,
      totalIncome,
      totalExpense,
      recentTransactions,
    };
  }

  initializeForUser(userId: string) {
    this.transactionsByUser.set(userId, []);
    this.seed(userId);
  }

  private seed(userId: string) {
    const descriptions = [
      { desc: 'Mercado Mensal', cat: 'Alimentação', type: 'EXPENSE' },
      { desc: 'Uber', cat: 'Transporte', type: 'EXPENSE' },
      { desc: 'Netflix', cat: 'Lazer', type: 'EXPENSE' },
      { desc: 'Academia', cat: 'Saúde', type: 'EXPENSE' },
      { desc: 'Curso de Inglês', cat: 'Educação', type: 'EXPENSE' },
      { desc: 'Aluguel', cat: 'Moradia', type: 'EXPENSE' },
      { desc: 'Salário de Maio', cat: 'Salário', type: 'INCOME' },
      { desc: 'Projeto Web', cat: 'Freelance', type: 'INCOME' },
      { desc: 'Jantar Restaurante', cat: 'Alimentação', type: 'EXPENSE' },
      { desc: 'Cinema', cat: 'Lazer', type: 'EXPENSE' },
      { desc: 'Farmácia', cat: 'Saúde', type: 'EXPENSE' },
      { desc: 'Gasolina', cat: 'Transporte', type: 'EXPENSE' },
    ];

    for (let i = 0; i < 15; i++) {
      const item =
        descriptions[Math.floor(Math.random() * descriptions.length)];
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      const amount =
        item.type === 'INCOME'
          ? 1000 + Math.random() * 4000
          : 10 + Math.random() * 400;

      this.create(userId, {
        description: item.desc,
        category: item.cat,
        type: item.type as 'INCOME' | 'EXPENSE',
        observations: 'Lorum ipsum dolor sit amet consectetur adipiscing elit',
        amount: Number(amount.toFixed(2)),
        date: date.toISOString(),
      });
    }
  }
}
