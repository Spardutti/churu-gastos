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

const userUrl = ({ login, register }: { login?: boolean; register?: boolean }) => {
  if (register) {
    return '/register/';
  }

  if (login) {
    return '/token/';
  }

  return '/user';
};

export const userAPI = {
  useGetUser: () =>
    useQuery({
      queryKey: ['user'],
      queryFn: () => axiosHelper<IUser>({ method: 'get', url: userUrl({}) }),
      // enabled: false,
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
