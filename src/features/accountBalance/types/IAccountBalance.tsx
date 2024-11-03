import type { IAccount } from '@/features/account/type/IAccount';
import type { Dayjs } from 'dayjs';

export interface IAccountBalance {
  id: string;
  account: IAccount;
  date: Dayjs;
  budget: number;
}
