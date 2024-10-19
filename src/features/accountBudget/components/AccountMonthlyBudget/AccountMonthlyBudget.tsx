import type { IAccountBudget } from '@/features/accountBudget/types/IAccountBudget';
import { formatCurrency } from '@/utils/formatCurrency';

interface AccountMonthlyBudgetProps {
  budget: IAccountBudget;
}

const AccountMonthlyBudget = ({ budget }: AccountMonthlyBudgetProps) => {
  return (
    <div>
      <p>budget</p>
      <p>{formatCurrency({ amount: budget.budget })}</p>
    </div>
  );
};

export default AccountMonthlyBudget;
