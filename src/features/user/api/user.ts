import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import type { IUser } from '@/features/user/types/IUser';

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IRegisterCredentials {
  email: string;
  password: string;
  language: string;
  timezone: string;
}

interface IProfile {
  access: string;
  refresh: string;
  email: string;
  id: string;
  timezone: string;
  language: string;
}

export const userAPI = {
  useGetUser: () =>
    useQuery({
      queryKey: ['user'],
      queryFn: () => axiosHelper<IUser>({ method: 'get', url: '/user/' }),
      // enabled: false,
    }),

  useLogin: () =>
    useMutation<IProfile, unknown, ILoginCredentials>({
      mutationFn: (data) => axiosHelper<IProfile, unknown, ILoginCredentials>({ method: 'post', url: '/token/', data }),
    }),

  useRegister: () =>
    useMutation<IUser, unknown, IRegisterCredentials>({
      mutationFn: (data) =>
        axiosHelper<IUser, unknown, IRegisterCredentials>({ method: 'post', url: '/register/', data }),
    }),
};
