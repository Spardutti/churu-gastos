import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { IAccountBudget } from '../types/IAccountBudget';

interface IAccountBudgetBody {
  account_id: string;
  budget: number;
}

export const accountBudgetAPI = {
  useGetAccountBudget: ({ year, month, accountId }: { year: number | null; month: number | null, accountId?: string  }) =>
    useQuery({
      queryKey: ['accountBudget', String(year), String(month), accountId],
      queryFn: () =>
        axiosHelper<{data: IAccountBudget}>({
          method: 'get',
          url: `/account-budget/?year=${year}&month=${month}&account_id=${accountId}`,
        }),
      enabled: !!year && !!month && !!accountId,
    }), 
  
  useGetAccountBudgets: ({ year, month }: { year?: number | null ; month?: number | null   }) =>
    useQuery({
      queryKey: ['accountBudgets', String(year), String(month)],
      queryFn: () => axiosHelper<{ data: IAccountBudget[] }>({ method: 'get', url: `/account-budget/?year=${year}&month=${month}` }),
      enabled: !!year && !!month,
    }),
  

  useCreateAccountBudget: () =>
    useMutation({
      mutationFn: (data: IAccountBudgetBody) => axiosHelper({ method: 'post', url: '/account-budget/', data }),
    }),
};
