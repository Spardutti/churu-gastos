import type { ICategory } from '@/features/category/types/ICategory';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { appendToList, updateBudget } from '@/utils/onMutationSuccess';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IBody {
  name: string;
  id?: string;
  budget: number;
}

interface IParams {
  year: string;
  month: string;
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
    }),

  useGetCategory: ({ categoryID }: { categoryID: string }) =>
    useQuery({
      queryKey: ['category', categoryID],
      queryFn: () => axiosHelper<{ data: ICategory }>({ method: 'get', url: `/categories/${categoryID}/` }),
      enabled: !!categoryID,
    }),

  useCreateCategory: () => {
    const queryClient = useQueryClient();
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);

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
};
