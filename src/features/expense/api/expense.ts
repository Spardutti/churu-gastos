import type { IExpense } from '@/features/expense/types/types';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useQuery } from '@tanstack/react-query';

const expenseUrl = ({ expenseID }: { expenseID: number | null }) => {
  if (expenseID) {
    return `/expenses/${expenseID}`;
  }

  return '/expenses';
};

export const expenseAPI = {
  useGetExpenses: () =>
    useQuery({
      queryFn: () => axiosHelper<IExpense[]>({ method: 'get', url: expenseUrl({ expenseID: null }) }),
      queryKey: ['expenses'],
    }),
};
