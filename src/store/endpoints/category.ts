import { Category } from '@/features/category/types/category';
import { Builder, churuGastosApi } from '@/store/api';
import { ApiResponse } from '@/store/types';

export const categoryEndpoint = (builder: Builder) => ({
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
    async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
      try {
        const { data: updatedPost } = await queryFulfilled;
        dispatch(
          churuGastosApi.util.updateQueryData('getCategories', undefined, (draft) => {
            draft.data!.push({ name: patch.name!, id: updatedPost.data?.id! });
          }),
        );
      } catch {}
    },
  }),
});
