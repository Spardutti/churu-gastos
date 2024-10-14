import useDateSelector from '@/features/month/hooks/useDateSelector';
import { totalAccountBudgetAPI } from '@/features/totalAccountBalance/api/totalAccountBalance';

const useGetTotalAccountMonthBudget = () => {
  const { activeDate } = useDateSelector();
  const { data } = totalAccountBudgetAPI.useGetTotalAccountBudget({ year: activeDate.year, month: activeDate.month });

  return data?.data.accountsBudget ?? '';
};

export default useGetTotalAccountMonthBudget;
