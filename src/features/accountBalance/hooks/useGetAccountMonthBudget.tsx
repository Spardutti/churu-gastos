import { accountBalanceAPI } from '@/features/accountBalance/api/accountBalance';
import useDateSelector from '@/features/month/hooks/useDateSelector';

const useAccountsMonthBalance = () => {
  const { activeDate } = useDateSelector();
  const { data } = accountBalanceAPI.useGetAccountBalances({ year: activeDate.year, month: activeDate.month });

  const total = data?.data.reduce((acc, curr) => acc + Number(curr.remainingBalance), 0);

  const accounts = data?.data?.map((balance) => ({
    id: balance.id,
    name: balance.account.name,
    balance: balance.remainingBalance,
  }));

  return { total, accounts };
};

export default useAccountsMonthBalance;
