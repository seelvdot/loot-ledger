import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import { join } from 'path';

export interface Attachment {
  name: string;
  size: string;
  data?: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  subcategory?: string;
  date: string;
  observations?: string;
  attachments?: Attachment[];
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

  private saveAttachment(fileName: string, base64Data: string): string {
    const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      return base64Data;
    }

    const fileContent = matches[2];
    const buffer = Buffer.from(fileContent, 'base64');
    const uniqueName = `${randomUUID()}-${fileName.replace(/\s+/g, '_')}`;
    const uploadsDir = join(process.cwd(), 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    fs.writeFileSync(join(uploadsDir, uniqueName), buffer);
    return `/uploads/${uniqueName}`;
  }

  create(
    userId: string,
    data: Omit<Transaction, 'id' | 'createdAt'>,
  ): Transaction {
    const userTransactions = this.transactionsByUser.get(userId) || [];
    
    let processedAttachments: Attachment[] | undefined = undefined;
    if (data.attachments) {
      processedAttachments = data.attachments.map((att) => {
        if (att.data) {
          const relativeUrl = this.saveAttachment(att.name, att.data);
          return {
            name: att.name,
            size: att.size,
            data: relativeUrl,
          };
        }
        return att;
      });
    }

    const newTransaction: Transaction = {
      ...data,
      attachments: processedAttachments,
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

    let processedAttachments: Attachment[] | undefined = undefined;
    if (data.attachments) {
      processedAttachments = data.attachments.map((att) => {
        if (att.data) {
          const relativeUrl = this.saveAttachment(att.name, att.data);
          return {
            name: att.name,
            size: att.size,
            data: relativeUrl,
          };
        }
        return att;
      });
    }

    const updatedData = {
      ...data,
      ...(data.attachments !== undefined && { attachments: processedAttachments }),
    };

    userTransactions[index] = { ...userTransactions[index], ...updatedData };
    this.transactionsByUser.set(userId, userTransactions);
    return userTransactions[index];
  }

  remove(userId: string, id: string): boolean {
    const userTransactions = this.transactionsByUser.get(userId) || [];
    const index = userTransactions.findIndex((t) => t.id === id);
    if (index === -1) return false;

    // Opcionalmente podemos excluir arquivos físicos vinculados à transação aqui se desejado

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

  getCategories(userId: string): string[] {
    const transactions = this.transactionsByUser.get(userId) || [];
    const categories = new Set(transactions.map((t) => t.category));
    return Array.from(categories).sort();
  }

  getSubcategories(userId: string): string[] {
    const transactions = this.transactionsByUser.get(userId) || [];
    const subcategoriesSet = new Set<string>();
    
    transactions.forEach((t) => {
      if (t.subcategory) {
        t.subcategory
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
          .forEach((sub) => subcategoriesSet.add(sub));
      }
    });

    return Array.from(subcategoriesSet).sort();
  }

  getWidgetData(
    userId: string,
    query: {
      period?: '7_DAYS' | '30_DAYS' | 'THIS_MONTH' | 'ALL_TIME';
      type?: 'ALL' | 'INCOME' | 'EXPENSE';
      category?: string;
      subcategory?: string;
      widgetType?: 'NUMERIC' | 'GRAPHIC';
    },
  ) {
    let transactions = this.transactionsByUser.get(userId) || [];

    // 1. Filtrar por período
    const now = new Date();
    if (query.period === '7_DAYS') {
      const limit = new Date();
      limit.setDate(limit.getDate() - 7);
      limit.setHours(0, 0, 0, 0);
      transactions = transactions.filter((t) => new Date(t.date) >= limit);
    } else if (query.period === '30_DAYS') {
      const limit = new Date();
      limit.setDate(limit.getDate() - 30);
      limit.setHours(0, 0, 0, 0);
      transactions = transactions.filter((t) => new Date(t.date) >= limit);
    } else if (query.period === 'THIS_MONTH') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      transactions = transactions.filter((t) => new Date(t.date) >= startOfMonth);
    }

    // 2. Filtrar por tipo (INCOME/EXPENSE)
    if (query.type && query.type !== 'ALL') {
      transactions = transactions.filter((t) => t.type === query.type);
    }

    // 3. Filtrar por categoria
    if (query.category && query.category !== 'ALL') {
      transactions = transactions.filter(
        (t) => t.category.toLowerCase() === query.category!.toLowerCase(),
      );
    }

    // 3.1. Filtrar por subcategoria
    if (query.subcategory && query.subcategory !== 'ALL') {
      const searchSub = query.subcategory.toLowerCase().trim();
      transactions = transactions.filter((t) => {
        if (!t.subcategory) return false;
        const subs = t.subcategory.split(',').map((s) => s.trim().toLowerCase());
        return subs.includes(searchSub);
      });
    }

    // 4. Agrupar/Calcular com base no widgetType
    if (query.widgetType === 'NUMERIC') {
      const total = transactions.reduce((acc, t) => acc + t.amount, 0);
      return { value: Number(total.toFixed(2)) };
    } else {
      // GRAPHIC: agrupar por categoria se category for 'ALL', senão agrupar por dia
      if (!query.category || query.category === 'ALL') {
        const categoryMap = new Map<string, number>();
        transactions.forEach((t) => {
          const cat = t.category;
          categoryMap.set(cat, (categoryMap.get(cat) || 0) + t.amount);
        });

        const data = Array.from(categoryMap.entries()).map(([name, value]) => ({
          name: name.toUpperCase(),
          value: Number(value.toFixed(2)),
        }));
        return { data };
      } else {
        const dateMap = new Map<string, number>();
        // Ordenar transações por data crescente para o gráfico
        const sortedTxs = [...transactions].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

        sortedTxs.forEach((t) => {
          const d = new Date(t.date);
          const key = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
          dateMap.set(key, (dateMap.get(key) || 0) + t.amount);
        });

        const data = Array.from(dateMap.entries()).map(([name, value]) => ({
          name,
          value: Number(value.toFixed(2)),
        }));
        return { data };
      }
    }
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

    const subcategoriesPool = ['Mercado', 'Combustível', 'Viagem', 'Assinatura', 'Serviço', 'Saúde', 'Trabalho'];
    const attachmentsPool = [
      { name: 'recibo-compra.pdf', size: '142 KB' },
      { name: 'comprovante-pix.png', size: '2.1 MB' },
      { name: 'fatura-energia.pdf', size: '480 KB' },
      { name: 'nota-fiscal.png', size: '1.2 MB' },
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

      // Gerar subcategoria aleatória (60% de chance, podendo ter 1 ou 2)
      let subcategory: string | undefined = undefined;
      if (Math.random() < 0.6) {
        const count = Math.floor(Math.random() * 2) + 1;
        const selected: string[] = [];
        for (let k = 0; k < count; k++) {
          const randomSub = subcategoriesPool[Math.floor(Math.random() * subcategoriesPool.length)];
          if (!selected.includes(randomSub)) {
            selected.push(randomSub);
          }
        }
        subcategory = selected.join(',');
      }

      // Gerar anexos aleatórios (40% de chance, podendo ter 1 ou 2)
      let attachments: any[] | undefined = undefined;
      if (Math.random() < 0.4) {
        const count = Math.floor(Math.random() * 2) + 1;
        const selected: any[] = [];
        for (let k = 0; k < count; k++) {
          const file = attachmentsPool[Math.floor(Math.random() * attachmentsPool.length)];
          if (!selected.some(f => f.name === file.name)) {
            // Criar arquivo físico de teste na pasta uploads
            const uniqueName = `seed-${randomUUID()}-${file.name.replace(/\s+/g, '_')}`;
            const uploadsDir = join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadsDir)) {
              fs.mkdirSync(uploadsDir, { recursive: true });
            }
            fs.writeFileSync(join(uploadsDir, uniqueName), `Arquivo de comprovante simulado para ${file.name}.`);
            
            selected.push({
              name: file.name,
              size: file.size,
              data: `/uploads/${uniqueName}`,
            });
          }
        }
        attachments = selected;
      }

      this.create(userId, {
        description: item.desc,
        category: item.cat,
        subcategory,
        type: item.type as 'INCOME' | 'EXPENSE',
        observations: 'Lorum ipsum dolor sit amet consectetur adipiscing elit',
        amount: Number(amount.toFixed(2)),
        date: date.toISOString(),
        attachments,
      });
    }
  }
}
