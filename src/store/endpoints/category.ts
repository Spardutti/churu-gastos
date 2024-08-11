import { Category } from '@/features/category/types/category';
import { Builder } from '@/store/api';
import { ApiResponse } from '@/store/types';

export const categoryEndpoint = (builder: Builder) => ({
  // getCategories: builder.query<{ data: Category[] }, void>({
  getCategories: builder.query<ApiResponse<Category[], 'data'>, void>({
    query: () => ({
      url: `/categories`,
      method: 'GET',
    }),
  }),

  createCategory: builder.mutation<ApiResponse<Category, 'data'>, Partial<Category>>({
    query: (body) => ({
      url: `/categories`,
      method: 'POST',
      body,
    }),
  }),
});
