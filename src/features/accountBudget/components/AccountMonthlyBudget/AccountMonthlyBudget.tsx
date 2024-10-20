import Card from '@/components/card';
import type { IAccountBudget } from '@/features/accountBudget/types/IAccountBudget';
import { formatCurrency } from '@/utils/formatCurrency';

interface AccountMonthlyBudgetProps {
  budget: IAccountBudget;
}

const AccountMonthlyBudget = ({ budget }: AccountMonthlyBudgetProps) => {
  return (
    <Card>
      <div className="flex gap-2 flex-col justify-center items-center">
        <p>budget</p>
        <p>{formatCurrency({ amount: budget.budget })}</p>
      </div>
    </Card>
  );
};

export default AccountMonthlyBudget;
