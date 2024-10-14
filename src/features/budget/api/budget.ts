import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useQuery } from '@tanstack/react-query';

interface IParams {
  year: string;
  month: string;
  categoryID?: string;
}

interface IResponse {
  data: { monthlyBudget: number };
}

export const budgetAPI = {
  useGetBudget: ({ year, month, categoryID, enabled = true }: IParams & { enabled?: boolean }) =>
    useQuery({
      queryFn: () =>
        axiosHelper<IResponse>({
          method: 'get',
          url: `/budget/?year=${year}&month=${month}&category_id=${categoryID}`,
        }),
      queryKey: ['budget', [year, month, categoryID]],
      enabled,
    }),
};
