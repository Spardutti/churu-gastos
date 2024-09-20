import type { ICategory } from '@/features/category/types/ICategory';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

const categoryUrl = ({ categoryID }: { categoryID?: string } = {}) => {
  if (categoryID) {
    return `/categories/${categoryID}/`;
  }

  return '/categories/';
};

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

  useCreateCategory: () =>
    useMutation({
      mutationFn: (data: ICategory) => axiosHelper<ICategory>({ method: 'post', url: categoryUrl(), data }),
    }),
};
