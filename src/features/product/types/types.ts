import { Category } from '@/features/category/types/category';

export type Product = {
  name: string;
  id: number;
  amount: number;
  category: Category;
  description: string;
  date?: Date;
};
