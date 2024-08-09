import { Category } from '@/features/category/types';
import { CreateProductPayload, Product } from '@/features/product/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const churuGastosApi = createApi({
  reducerPath: 'churuGastos',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1' }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ data: Product[] }, void>({
      query: () => `/products`,
    }),
    creteProduct: builder.mutation<Product, CreateProductPayload>({
      query: (body) => ({
        url: `/products`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(newProduct, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          churuGastosApi.util.updateQueryData('getProducts', undefined, (draft) => {
            draft.data.push({
              ...newProduct,
              id: Date.now(),
              category: { id: newProduct.category_id, name: newProduct.category_name },
            } as Product);
          }),
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: `/categories`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(newCategory, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          churuGastosApi.util.updateQueryData('getCategories', undefined, (draft) => {
            draft.data.push({ ...newCategory, id: Date.now() } as Category); // Temporarily assign a fake ID or leave it for server to assign
          }),
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
    getCategories: builder.query<{ data: Category[] }, void>({
      query: () => `/categories`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useCreateCategoryMutation, useGetCategoriesQuery, useCreteProductMutation } =
  churuGastosApi;
