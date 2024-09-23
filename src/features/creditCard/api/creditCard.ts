import type { ICreditCard } from '@/features/creditCard/types/ICreditCard';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

export const creditCardAPI = {
  useGetCreditCards: () =>
    useQuery({
      queryKey: ['creditCards'],
      queryFn: () => axiosHelper<{ data: ICreditCard[] }>({ method: 'get', url: '/credit-cards/' }),
    }),

  useCreateCreditCard: () => {
    return useMutation({
      mutationFn: (data: ICreditCard) => axiosHelper({ method: 'post', url: '/credit-cards/', data }),
    });
  },
};
