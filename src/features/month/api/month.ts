import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation } from '@tanstack/react-query';
import type { Dayjs } from 'dayjs';

export const monthAPI = {
  useGenerateCategories: () => {
    return useMutation({
      mutationFn: ({ date }: { date: Dayjs }) => axiosHelper({ method: 'post', url: '/new-month/', data: { date } }),
    });
  },
};
