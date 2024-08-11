import { categoryEndpoint } from '@/store/endpoints/category';
import { productEndpoints } from '@/store/endpoints/product';
import { userEndpoint } from '@/store/endpoints/user';
import { RootState } from '@/store/store';
import {
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

export type Builder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
  never,
  'churuGastos'
>;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get the token from the Redux store
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Define a service using a base URL and expected endpoints
export const churuGastosApi = createApi({
  reducerPath: 'churuGastos',
  baseQuery,
  endpoints: (builder) => ({
    ...categoryEndpoint(builder),
    ...userEndpoint(builder),
    ...productEndpoints(builder),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useCreteProductMutation,
  useLoginMutation,
  useSignupMutation,
} = churuGastosApi;
