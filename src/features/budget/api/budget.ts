import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useQuery } from '@tanstack/react-query';

interface IBudget {
  year: string;
  month: string;
}
const budgetUrl = ({ year, month }: IBudget) => {
  return `/budget/?year=${year}&month=${month}`;
};

export const budgetAPI = {
  useGetBudget: ({ year, month, enabled = true }: IBudget & { enabled?: boolean }) =>
    useQuery({
      queryFn: () => axiosHelper<{ data: { budget: number } }>({ method: 'get', url: budgetUrl({ year, month }) }),
      queryKey: ['budget', [year, month]],
      enabled,
    }),
};
