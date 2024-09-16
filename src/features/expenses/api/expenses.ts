import type { IExpense } from '@/features/expenses/types/IExpense';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

const expenseURL = ({ ID, query }: { ID?: number; query?: string }) => {
  if (query) {
    return `/expenses?${query}`;
  }

  if (ID) {
    return `/expenses/${ID}`;
  }

  return '/expenses';
};

export const expensesAPI = {
  useGetExpenses: ({ query, enabled = true }: { query?: string; enabled?: boolean } = {}) =>
    useQuery({
      queryFn: () => axiosHelper<IExpense[]>({ method: 'get', url: expenseURL({ query }) }),
      queryKey: ['expenses', query],
      enabled,
    }),

  useCreateExpense: () =>
    useMutation({
      mutationFn: (data: IExpense) => axiosHelper<IExpense>({ method: 'post', url: expenseURL({}), data }),
    }),
};
