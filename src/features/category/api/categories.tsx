import type { ICategory } from '@/features/category/types/ICategory';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { addToBudget, appendToList } from '@/utils/onMutationSuccess';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const categoryUrl = ({ categoryID }: { categoryID?: string } = {}) => {
  if (categoryID) {
    return `/categories/${categoryID}/`;
  }

  return '/categories/';
};

interface IBody {
  name: string;
  amount: number;
}

export const categoriesAPI = {
  useGetCategories: () =>
    useQuery({
      queryKey: ['categories'],
      queryFn: () => axiosHelper<{ data: ICategory[] }>({ method: 'get', url: categoryUrl() }),
    }),

  useGetCategory: ({ categoryID }: { categoryID: string }) =>
    useQuery({
      queryKey: ['category', categoryID],
      queryFn: () => axiosHelper<{ data: ICategory }>({ method: 'get', url: categoryUrl({ categoryID }) }),
      enabled: !!categoryID,
    }),

  useCreateCategory: () => {
    const queryClient = useQueryClient();
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);

    return useMutation({
      mutationFn: (data: IBody) => axiosHelper<{ data: IBody }>({ method: 'post', url: categoryUrl(), data }),
      onSuccess: (response, data) => {
        appendToList<ICategory[], ICategory>({ queryKey: ['categories'], queryClient, newItem: response.data });
        addToBudget({ queryClient, queryKey: ['budget', [year, month, undefined]], amount: data.amount });
      },
    });
  },
};
