import type { IExpense } from '@/features/expenses/types/IExpense';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

interface IParams {
  ID?: string;
  year?: string;
  month?: string;
}

const expenseURL = ({ ID, year, month }: IParams) => {
  if (year && month) {
    return `/expenses/?year=${year}&month=${month}`;
  }

  if (ID) {
    return `/expenses/${ID}`;
  }

  return '/expenses';
};

export const expensesAPI = {
  useGetExpenses: ({
    year,
    month,
    ID,
    enabled = true,
  }: { year?: string; month?: string; ID?: string; enabled?: boolean } = {}) =>
    useQuery({
      queryFn: () => axiosHelper<{ data: IExpense[] }>({ method: 'get', url: expenseURL({ ID, year, month }) }),
      queryKey: ['expenses', [year, month]],
      enabled,
    }),

  useCreateExpense: () =>
    useMutation({
      mutationFn: (data: IExpense) => axiosHelper<IExpense>({ method: 'post', url: expenseURL({}), data }),
    }),
};
