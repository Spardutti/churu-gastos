import type { Category } from '@/features/category/types/category';

export interface IExpense {
  name: string;
  id: number;
  amount: number;
  category: number;
  description: string;
  date: Date;
}
