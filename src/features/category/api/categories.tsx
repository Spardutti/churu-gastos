import type { ICategory } from '@/features/category/types/ICategory';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { appendToList, updateBudget } from '@/utils/onMutationSuccess';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Dayjs } from 'dayjs';

interface IBody {
  name: string;
  id?: string;
  budget: number;
  date: Dayjs;
}

interface IParams {
  year: number | null;
  month: number | null;
}

export const categoriesAPI = {
  useGetCategories: ({ year, month }: IParams) =>
    useQuery({
      queryKey: ['categories', [String(year), String(month)]],
      queryFn: () =>
        axiosHelper<{ data: ICategory[]; monthly_budget: number; is_new_month: boolean }>({
          method: 'get',
          url: `/categories/?year=${year}&month=${month}`,
        }),
      enabled: !!year && !!month,
    }),

  useGetCategory: ({ categoryID }: { categoryID: string }) =>
    useQuery({
      queryKey: ['category', categoryID],
      queryFn: () => axiosHelper<{ data: ICategory }>({ method: 'get', url: `/categories/${categoryID}/` }),
      enabled: !!categoryID,
    }),

  useCreateCategory: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: IBody) => axiosHelper<{ data: IBody }>({ method: 'post', url: '/categories/', data }),
      onSuccess: (response, data) => {
        appendToList<ICategory[], ICategory>({
          queryKey: ['categories', [String(data.date.year()), String(data.date.month() + 1)]],
          queryClient,
          newItem: response.data,
        });
        updateBudget({
          queryClient,
          queryKey: ['categories', [String(data.date.year()), String(data.date.month() + 1)]],
          amount: response.data.budget,
          type: 'income',
        });
      },
    });
  },

  useDeleteCategory: () => {
    return useMutation({
      mutationFn: ({ categoryID }: { categoryID: string }) =>
        axiosHelper<{ data: ICategory }>({ method: 'delete', url: `/categories/${categoryID}/` }),
    });
  },
};
