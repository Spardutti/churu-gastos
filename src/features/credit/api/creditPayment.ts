import type { ICreditPayment } from '../types/ICreditPayment';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { appendToList } from '@/utils/onMutationSuccess';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Dayjs } from 'dayjs';

export interface ICreatePaymentBody {
  description: string;
  monthly_payment_amount: number;
  next_payment_date: Dayjs;
  number_of_payments: number;
}

export const creditPaymentAPI = {
  useGetCreditPayments: () =>
    useQuery({
      queryKey: ['creditPayments'],
      queryFn: () => axiosHelper<{ data: ICreditPayment[]; month_total: number }>({ method: 'get', url: '/credits/' }),
    }),

  useCreateCreditPayment: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: ICreatePaymentBody) =>
        axiosHelper<{ data: ICreditPayment }>({ method: 'post', url: '/credits/', data }),
      onSuccess: (response) =>
        appendToList<ICreditPayment[], ICreditPayment>({
          queryClient,
          queryKey: ['creditPayments'],
          newItem: response.data,
        }),
    });
  },
};
