import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useQuery } from '@tanstack/react-query';

export const totalAccountBudgetAPI = {
  useGetTotalAccountBudget: ({ year, month }: { year: number | null; month: number | null }) =>
    useQuery({
      queryKey: ['totalAccountBudget', String(year), String(month)],
      queryFn: () =>
        axiosHelper<{ data: { accountsBudget: number } }>({
          method: 'get',
          url: `/monthly-account-budget?year=${year}&month=${month}`,
        }),
      enabled: !!year && !!month,
    }),
};
