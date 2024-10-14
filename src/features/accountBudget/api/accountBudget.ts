import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { IAccountBudget } from '../types/IAccountBudget';

interface IAccountBudgetBody {
  category_id: string;
  amount: number;
}

export const accountBudgetAPI = {
  useGetAccountBudget: ({ year, month }: { year: number | null; month: number | null }) =>
    useQuery({
      queryKey: ['accountBudget', String(year), String(month)],
      queryFn: () =>
        axiosHelper<{ data: IAccountBudget[] }>({
          method: 'get',
          url: `/account-budget/?year=${year}&month=${month}`,
        }),
      enabled: !!year && !!month,
    }),

  useCreateAccountBudget: () =>
    useMutation({
      mutationFn: (data: IAccountBudgetBody) => axiosHelper({ method: 'post', url: '/account-budget/', data }),
    }),
};
