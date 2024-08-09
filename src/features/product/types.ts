import { Category } from '@/features/category/types';

export type Product = {
  name: string;
  id: number;
  amount: number;
  category: Category;
  description: string;
  date?: Date;
};

export type CreateProductPayload = {
  name: string;
  amount: number;
  category_id: number;
  category_name: string;
  description?: string;
};
