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
}
