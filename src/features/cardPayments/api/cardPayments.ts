import type { ICardPayment } from './../types/ICardPayment';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

export const cardPaymentAPI = {
  useGetCardPayments: () =>
    useQuery({
      queryKey: ['cardPayments'],
      queryFn: () => axiosHelper<{ data: ICardPayment[] }>({ method: 'get', url: '/card-payments/' }),
    }),

  useCreateCardPayment: () => {
    return useMutation({
      mutationFn: (data: ICardPayment) => axiosHelper<ICardPayment>({ method: 'post', url: '/card-payments/', data }),
    });
  },
};
