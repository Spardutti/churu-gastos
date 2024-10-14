import type { IAccount } from '@/features/account/type/IAccount';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

interface IAccountBody {
  name: string;
  description?: string;
}

export const accountAPI = {
  useGetAccounts: () =>
    useQuery({
      queryKey: ['accounts'],
      queryFn: () => axiosHelper<{ data: IAccount[] }>({ method: 'get', url: '/accounts/' }),
    }),

  useCreateAccount: () =>
    useMutation({
      mutationFn: (data: IAccountBody) => axiosHelper<{ data: IAccount }>({ method: 'post', url: '/accounts/', data }),
    }),
};
