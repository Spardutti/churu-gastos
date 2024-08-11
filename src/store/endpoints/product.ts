import { Product } from '@/features/product/types/types';
import { Builder, churuGastosApi } from '@/store/api';
import { ApiResponse } from '@/store/types';

type CreateProductPayload = {
  name: string;
  amount: number;
  category_id: number;
  category_name: string;
  description?: string;
};

export const productEndpoints = (builder: Builder) => ({
  getProducts: builder.query<ApiResponse<Product[], 'data'>, void>({
    query: () => `/products`,
  }),
  creteProduct: builder.mutation<ApiResponse<Product, 'data'>, CreateProductPayload>({
    query: (body) => ({
      url: `/products`,
      method: 'POST',
      body,
    }),
    async onQueryStarted(newProduct, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        churuGastosApi.util.updateQueryData('getProducts', undefined, (draft) => {
          draft.data!.push({
            ...newProduct,
            id: Date.now(),
            category: { id: newProduct.category_id, name: newProduct.category_name },
          } as Product);
        }),
      );

      queryFulfilled.catch(patchResult.undo);
    },
  }),
});
