import type { IItem } from '@/features/items/types/types';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

const items = ({ expenseID, query }: { expenseID?: number; query?: string }) => {
  if (expenseID) {
    return `/items/${expenseID}`;
  }

  if (query) {
    return `/items?${query}`;
  }

  return '/items';
};

export const itemAPI = {
  useGetItems: ({ query, expenseID, enabled = true }: { query?: string; expenseID?: number; enabled?: boolean } = {}) =>
    useQuery({
      queryFn: () => axiosHelper<IItem[]>({ method: 'get', url: items({ expenseID, query }) }),
      queryKey: ['items', query],
      enabled,
    }),

  useCreateItem: () =>
    useMutation({
      mutationFn: (data: IItem) => axiosHelper<IItem>({ method: 'post', url: items({}), data }),
    }),

  // useUpdateItem: () =>
  //   useMutation({
  //     mutationFn: (data: IItem) => axiosHelper<IItem>({ method: 'put', url: items({ expenseID: data.id }), data }),
  //   }),

  // useDeleteItem: () =>
  //   useMutation({
  //     mutationFn: (id: number) => axiosHelper({ method: 'delete', url: items({ expenseID: id }) }),
  //   }),
};
