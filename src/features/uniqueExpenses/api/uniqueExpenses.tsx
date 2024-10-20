import type { IUniqueExpense } from '@/features/uniqueExpenses/types/IUniqueExpense';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { appendToList } from '@/utils/onMutationSuccess';
import { yearAndMonth } from '@/utils/yearAndMonth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IParms {
  year: string;
  month: string;
}
export const uniqueExpenseAPI = {
  useGetUniqueExpenses: ({ year, month }: IParms) =>
    useQuery({
      queryFn: () =>
        axiosHelper<{ data: IUniqueExpense[] }>({
          method: 'get',
          url: `/unique-expenses/?year=${year}&month=${month}`,
        }),
      queryKey: ['uniqueExpenses', [year, month]],
    }),

  useCreateUniqueExpense: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: { description: string; amount: number; account_budget_id: string }) =>
        axiosHelper<{ data: IUniqueExpense }>({
          method: 'post',
          url: '/unique-expenses/',
          data,
        }),
      onSuccess: (response) => {
        const { year, month } = yearAndMonth();

        return appendToList({
          queryKey: ['uniqueExpenses', [year, month]],
          newItem: response.data,
          queryClient,
        });
      },
    });
  },
};
