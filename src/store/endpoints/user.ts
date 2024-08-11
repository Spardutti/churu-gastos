import { User } from '@/features/user/types/user';
import { Builder } from '@/store/api';
import { ApiResponse } from '@/store/types';

export const userEndpoint = (builder: Builder) => ({
  login: builder.mutation<ApiResponse<User, 'user'>, Partial<User>>({
    query: (body) => ({
      url: `/login`,
      method: 'POST',
      body,
    }),
  }),

  signup: builder.mutation<ApiResponse<User, 'user'>, Partial<User>>({
    query: (body) => ({
      url: `/register`,
      method: 'POST',
      body: { user: body },
    }),
  }),
});
