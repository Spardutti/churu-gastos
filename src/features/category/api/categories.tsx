import type { ICategory } from '@/features/category/types/category';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

const categoryUrl = ({ categoryID }: { categoryID?: number } = {}) => {
  if (categoryID) {
    return `/categories${categoryID}`;
  }

  return '/categories';
};

export const categoriesAPI = {
  useGetCategories: () =>
    useQuery({
      queryKey: ['categories'],
      queryFn: () => axiosHelper<ICategory[]>({ method: 'get', url: categoryUrl() }),
    }),

  useCreateCategory: () =>
    useMutation({
      mutationFn: (data: ICategory) => axiosHelper<ICategory>({ method: 'post', url: categoryUrl(), data }),
    }),
};
