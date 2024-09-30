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
  console.log('queryKey:', queryKey);
  queryClient.setQueryData(queryKey, (oldData: { data: T[] }) => {
    console.log("oldData:", oldData)
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
  type: 'expense' | 'income';
}

export const updateBudget = ({ queryClient, queryKey, amount, type }: Budget) => {
  queryClient.setQueryData(queryKey, (oldData: { monthly_budget: number }) => {
    if (!oldData) return;

    let budget = Number(oldData.monthly_budget);

    if (type === 'expense') {
      budget -= Number(amount);
    } else if (type === 'income') {
      budget += Number(amount);
    }

    const newData = {
      ...oldData,
      monthly_budget: budget,
    };

    return newData;
  });
};
