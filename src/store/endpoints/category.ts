import { Category } from '@/features/category/types/category';
import { Builder } from '@/store/api';

export const categoryEndpoint = (builder: Builder) => ({
  getCategories: builder.query<{ data: Category[] }, void>({
    query: () => ({
      url: `/categories`,
      method: 'GET',
    }),
  }),

  createCategory: builder.mutation<Category, Partial<Category>>({
    query: (body) => ({
      url: `/categories`,
      method: 'POST',
      body,
    }),
  }),
});
