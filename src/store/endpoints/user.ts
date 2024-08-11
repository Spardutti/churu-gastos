import { User } from '@/features/user/types/user';
import { Builder } from '@/store/api';

export const userEndpoint = (builder: Builder) => ({
  login: builder.mutation<User, Partial<User>>({
    query: (body) => ({
      url: `/login`,
      method: 'POST',
      body,
    }),
  }),

  signup: builder.mutation<User, Partial<User>>({
    query: (body) => ({
      url: `/register`,
      method: 'POST',
      body: { user: body },
    }),
  }),
});
