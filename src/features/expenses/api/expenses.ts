import type { IExpense } from '@/features/expenses/types/IExpense';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { appendToList } from '@/utils/onMutationSuccess';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Dayjs } from 'dayjs';

interface IParams {
  ID?: string;
  year?: number | null;
  month?: number | null;
  categoryID?: string;
}

interface IBody {
  amount: number;
  description?: string;
  category_id: string;
  date: Dayjs;
}

const expenseURL = ({ ID, year, month, categoryID }: IParams) => {
  if (year && month && categoryID) {
    return `/expenses/?year=${year}&month=${month}&category_id=${categoryID}`;
  }

  if (year && month) {
    return `/expenses/?year=${year}&month=${month}`;
  }

  if (ID) {
    return `/expenses/${ID}/`;
  }

  return '/expenses/';
};

export const expensesAPI = {
  useGetExpenses: ({
    year,
    month,
    categoryID,
    ID,
  }: {
    year: number | null;
    month: number | null;
    ID?: string;
    enabled?: boolean;
    categoryID?: string;
  }) => {
    console.log(!!year && !!month);
    return useQuery({
      queryFn: () =>
        axiosHelper<{ data: IExpense[] }>({ method: 'get', url: expenseURL({ ID, year, month, categoryID }) }),
      queryKey: ['expenses', [categoryID, String(year), String(month)]],
      enabled: !!year && !!month,
    });
  },

  useCreateExpense: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (data: IBody) => axiosHelper<{ data: IExpense }>({ method: 'post', url: expenseURL({}), data }),
      onSuccess: (response, { date, category_id }) => {
        appendToList<IExpense[], IExpense>({
          queryKey: ['expenses', [category_id, String(date.year()), String(date.month() + 1)]],
          queryClient,
          newItem: response.data,
        });
      },
    });
  },
};
