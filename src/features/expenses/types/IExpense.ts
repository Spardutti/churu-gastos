import type { ICategory } from '@/features/category/types/category';
import type { IItem } from '@/features/items/types/types';

export interface IExpense {
  id: number;
  item: IItem;
  amount: number;
  date: Date;
  category: ICategory;
}
