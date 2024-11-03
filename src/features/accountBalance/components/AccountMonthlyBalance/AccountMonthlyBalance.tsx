import Card from '@/components/card';
import type { IAccountBalance } from '@/features/accountBalance/types/IAccountBalance';
import { formatCurrency } from '@/utils/formatCurrency';

interface AccountMonthlyBalanceProps {
  budget: IAccountBalance;
}

const AccountMonthlyBalance = ({ budget }: AccountMonthlyBalanceProps) => {
  return (
    <Card>
      <div className="flex gap-2 flex-col justify-center items-center">
        <p>Balance</p>
        <p>{formatCurrency({ amount: budget.remainingBalance })}</p>
      </div>
    </Card>
  );
};

export default AccountMonthlyBalance;
