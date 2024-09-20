import type { IExpense } from '@/features/expenses/types/IExpense';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

interface IParams {
  ID?: string;
  year?: string;
  month?: string;
  categoryID?: string;
}

interface IBody {
  amount: number;
  description?: string;
  category_id: string;
  date: Date
}

const expenseURL = ({ ID, year, month, categoryID }: IParams) => {
  if (year && month && categoryID) {
    return `/expenses/?year=${year}&month=${month}&category_id=${categoryID}`;
  }

  if (year && month) {
    return `/expenses/?year=${year}&month=${month}`;
  }

  if (ID) {
    return `/expenses/${ID}/`;
  }

  return '/expenses/';
};

export const expensesAPI = {
  useGetExpenses: ({
    year,
    month,
    categoryID,
    ID,
    enabled = true,
  }: { year?: string; month?: string; ID?: string; enabled?: boolean; categoryID?: string } = {}) =>
    useQuery({
      queryFn: () =>
        axiosHelper<{ data: IExpense[] }>({ method: 'get', url: expenseURL({ ID, year, month, categoryID }) }),
      queryKey: ['expenses', [year, month]],
      enabled,
    }),

  useCreateExpense: () =>
    useMutation({
      mutationFn: (data: IBody) => axiosHelper<IExpense>({ method: 'post', url: expenseURL({}), data }),
    }),
};
