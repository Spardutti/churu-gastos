import type { ICategory } from '@/features/category/types/category';

export interface IItem {
  name: string;
  id: number | string;
  category: ICategory;
  description: string;
}
