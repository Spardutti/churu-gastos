import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useQuery } from '@tanstack/react-query';

interface IParams {
  year: string;
  month: string;
  categoryID?: string;
}

interface IResponse {
  data: { monthly_budget: number };
}

const budgetUrl = ({ year, month, categoryID }: IParams) => {
  return `/budget/?year=${year}&month=${month}&category_id=${categoryID}`;
};

export const budgetAPI = {
  useGetBudget: ({ year, month, categoryID, enabled = true }: IParams & { enabled?: boolean }) =>
    useQuery({
      queryFn: () => axiosHelper<IResponse>({ method: 'get', url: budgetUrl({ year, month, categoryID }) }),
      queryKey: ['budget', [year, month]],
      enabled,
    }),
};
