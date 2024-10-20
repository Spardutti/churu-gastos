import { axiosHelper } from "@/lib/axios/axiosHelper";
import { useQuery } from "@tanstack/react-query";
import type { IAccountBudgetExpense } from '../types/IAccountBudgetExpense';

export const accountBudgetExpensesAPI = {
  useGetAccountBudgetExpenses: ({accountBudgetId} : {accountBudgetId: string}) => useQuery({
    queryKey: ['accountBudgetExpenses'],
    queryFn: () => axiosHelper<{ data: IAccountBudgetExpense[] }>({ method: 'get', url: `/account-budget-expenses?account_budget_id=${accountBudgetId}` }),
    enabled: !!accountBudgetId
  })
}