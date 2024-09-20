import type { QueryKey } from '@tanstack/react-query';
import type { useQueryClient } from '@tanstack/react-query';

interface Base {
  queryKey: QueryKey;
  queryClient: ReturnType<typeof useQueryClient>;
}

/* -------------------------------------------------------------------------- */
/*                                   Append                                   */
/* -------------------------------------------------------------------------- */

interface List<Q> extends Base {
  newItem: Q;
}

export const appendToList = <T, Q>({ queryKey, queryClient, newItem }: List<Q>) => {
  queryClient.setQueryData(queryKey, (oldData: { data: T[] }) => {
    if (!oldData?.data) return;

    const newData = {
      ...oldData,
      data: [...oldData.data, newItem],
    };

    return newData;
  });
};

/* -------------------------------------------------------------------------- */
/*                                   Budget                                   */
/* -------------------------------------------------------------------------- */

interface Budget extends Base {
  amount: number;
}

export const addToBudget = ({ queryClient, queryKey, amount }: Budget) => {
  queryClient.setQueryData(queryKey, (oldData: { data: { monthly_budget: number } }) => {
    if (!oldData) return;

    const newData = {
      ...oldData,
      data: {
        ...oldData.data,
        monthly_budget: oldData.data.monthly_budget + amount,
      },
    };

    return newData;
  });
};
