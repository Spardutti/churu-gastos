import type { ICategoryBudget } from '@/features/dashboard/types/categoryBudget';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useQuery } from '@tanstack/react-query';

interface IParams {
  query: string;
}
const budgetUrl = ({ query }: IParams) => {
  if (query) {
    return `/categoryBudgets?${query}`;
  }
  return '/categoryBudgets';
};

export const budgetAPI = {
  useGetBudget: ({ query }: IParams) =>
    useQuery({
      queryFn: () => axiosHelper<ICategoryBudget[]>({ method: 'get', url: budgetUrl({ query }) }),
      queryKey: [budgetUrl, query],
    }),
};
