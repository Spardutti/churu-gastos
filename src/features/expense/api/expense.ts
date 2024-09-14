import type { IExpense } from '@/features/expense/types/types';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useQuery } from '@tanstack/react-query';

const expenseUrl = ({ expenseID, query }: { expenseID?: number; query?: string }) => {
  if (expenseID) {
    return `/expenses/${expenseID}`;
  }

  if (query) {
    return `/expenses?${query}`;
  }

  return '/expenses';
};

export const expenseAPI = {
  useGetExpenses: ({
    query,
    expenseID,
    enabled = true,
  }: { query?: string; expenseID?: number; enabled?: boolean } = {}) =>
    useQuery({
      queryFn: () => axiosHelper<IExpense[]>({ method: 'get', url: expenseUrl({ expenseID, query }) }),
      queryKey: ['expenses', query],
      enabled,
    }),
};
