import type { IAccountBalance } from '@/features/accountBalance/types/IAccountBalance';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

interface IAccountBalanceBody {
  account_id: string;
  budget: number;
}

export const accountBalanceAPI = {
  useGetAccountBalance: ({
    year,
    month,
    accountId,
  }: {
    year: number | null;
    month: number | null;
    accountId?: string;
  }) =>
    useQuery({
      queryKey: ['accountBalance', String(year), String(month), accountId],
      queryFn: () =>
        axiosHelper<{ data: IAccountBalance }>({
          method: 'get',
          url: `/account-budget/?year=${year}&month=${month}&account_id=${accountId}`,
        }),
      enabled: !!year && !!month && !!accountId,
    }),

  useGetAccountBalances: ({ year, month }: { year?: number | null; month?: number | null }) =>
    useQuery({
      queryKey: ['accountBalances', String(year), String(month)],
      queryFn: () =>
        axiosHelper<{ data: IAccountBalance[] }>({
          method: 'get',
          url: `/account-budget/?year=${year}&month=${month}`,
        }),
      enabled: !!year && !!month,
    }),

  useCreateAccountBalance: () =>
    useMutation({
      mutationFn: (data: IAccountBalanceBody) => axiosHelper({ method: 'post', url: '/account-budget/', data }),
    }),

  useUpdateAccountBalance: () =>
    useMutation({
      mutationFn: ({ id, budget }: { id: string; budget: number }) =>
        axiosHelper({ method: 'patch', url: `/account-budget/${id}`, data: { budget } }),
    }),
};
