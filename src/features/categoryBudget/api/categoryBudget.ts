import type { ICategoryBudget } from '@/features/dashboard/types/ICategoryBudget';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

const categoryBudgetUrl = () => {
  return '/categoryBudgets';
};

interface CategoryBudgetDTO {
  categoryID: string;
  budget: number;
  id: string;
  date: Date;
}

export const categoryBudgetAPI = {
  useGetCategoryBudgets: () =>
    useQuery({
      queryKey: ['categoryBudgets'],
      queryFn: () => axiosHelper<ICategoryBudget[]>({ method: 'get', url: categoryBudgetUrl() }),
    }),

  useCreateCategoryBudget: () =>
    useMutation({
      mutationFn: (data: CategoryBudgetDTO) =>
        axiosHelper<ICategoryBudget>({ method: 'post', url: categoryBudgetUrl(), data }),
    }),
};
