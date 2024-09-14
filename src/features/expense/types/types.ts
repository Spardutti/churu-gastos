import type { ICategory } from '@/features/category/types/category';

export interface IExpense {
  name: string;
  id: number;
  amount: number;
  category: ICategory;
  description: string;
  date: Date;
}
