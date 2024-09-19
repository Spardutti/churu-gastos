import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import type { IUser } from '@/features/user/types/user';

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IToken {
  access: string;
  refresh: string;
}

const userUrl = ({ userID, login, register }: { userID?: number; login?: boolean; register?: boolean }) => {
  if (register) {
    return '/register/';
  }

  if (login) {
    return '/token/';
  }

  if (userID) {
    return `/users/${userID}`;
  }

  return '/users';
};

export const userAPI = {
  useGetUser: ({ userID }: { userID: number }) =>
    useQuery({
      queryKey: ['user', userID],
      queryFn: () => axiosHelper<IUser>({ method: 'get', url: userUrl({ userID }) }),
      enabled: !!userID,
    }),

  useLogin: () =>
    useMutation<IToken, unknown, ILoginCredentials>({
      mutationFn: (data) =>
        axiosHelper<IToken, unknown, ILoginCredentials>({ method: 'post', url: userUrl({ login: true }), data }),
    }),

  useRegister: () =>
    useMutation<IUser, unknown, ILoginCredentials>({
      mutationFn: (data) =>
        axiosHelper<IUser, unknown, ILoginCredentials>({ method: 'post', url: userUrl({ register: true }), data }),
    }),
};
