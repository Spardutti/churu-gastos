import { Product } from '@/features/product/types/types';
import { Builder, churuGastosApi } from '@/store/api';
import { ApiResponse } from '@/store/types';

type CreateProductPayload = {
  name: string;
  amount: number;
  category_id: number;
  category_name: string;
  description?: string;
  date: string;
};

export const productEndpoints = (builder: Builder) => ({
  getProducts: builder.query<ApiResponse<Product[], 'data'>, { date: string }>({
    query: ({ date }) => {
      const queryString = `?date=${encodeURIComponent(date)}`;
      return `/products${queryString}`;
    },
  }),
  creteProduct: builder.mutation<ApiResponse<Product, 'data'>, CreateProductPayload>({
    query: (body) => ({
      url: `/products`,
      method: 'POST',
      body,
    }),
    async onQueryStarted(newProduct, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        churuGastosApi.util.updateQueryData('getProducts', { date: newProduct.date }, (draft) => {
          draft.data!.push({
            ...newProduct,
            id: Date.now(),
            category: { id: newProduct.category_id, name: newProduct.category_name },
            date: new Date(newProduct.date),
          } as Product);
        }),
      );

      queryFulfilled.catch(patchResult.undo);
    },
  }),
});
