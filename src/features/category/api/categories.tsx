import type { ICategory } from '@/features/category/types/ICategory';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { appendToList, updateBudget } from '@/utils/onMutationSuccess';
import { yearAndMonth } from '@/utils/yearAndMonth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IBody {
  name: string;
  id?: string;
  budget: number;
}

interface IParams {
  year: number | null;
  month: number | null;
}

export const categoriesAPI = {
  useGetCategories: ({ year, month }: IParams) =>
    useQuery({
      queryKey: ['categories', [year, month]],
      queryFn: () =>
        axiosHelper<{ data: ICategory[]; monthly_budget: number }>({
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
    const { year, month } = yearAndMonth();

    return useMutation({
      mutationFn: (data: IBody) => axiosHelper<{ data: IBody }>({ method: 'post', url: '/categories/', data }),
      onSuccess: (response) => {
        appendToList<ICategory[], ICategory>({
          queryKey: ['categories', [year, month]],
          queryClient,
          newItem: response.data,
        });
        updateBudget({
          queryClient,
          queryKey: ['categories', [year, month]],
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
