import type { IAccount } from '@/features/account/type/IAccount';
import type { Dayjs } from 'dayjs';

export interface IAccountBudget {
  id: string;
  account: IAccount;
  date: Dayjs;
  budget: number;
}
