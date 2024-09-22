import Card from '@/components/card';
import type { IExpense } from '@/features/expenses/types/IExpense';
import { formatCurrency } from '@/utils/formatCurrency';
import { useMemo } from 'react';

interface ExpenseTrackerProps {
  budgetLabel: string;
  expensesLabel: string;
  expenses: IExpense[] | undefined;
  budget: number;
}

const styles = {
  card: 'flex flex-col gap-2 items-center lg:min-w-44',
  cardText: 'text-white font-bold',
};

const ExpenseTracker = ({ budgetLabel, expensesLabel, expenses, budget }: ExpenseTrackerProps) => {
  const monthlyExpense = useMemo(() => {
    return expenses?.reduce((acc, expense) => {
      return acc + Number(expense.amount);
    }, 0);
  }, [expenses]);

  return (
    <div className="flex lg:flex-row flex-col gap-4 lg:gap-10 justify-center">
      <Card>
        <div className={styles.card}>
          <p>{budgetLabel}</p>
          <p className={styles.cardText}>{formatCurrency({ amount: budget || 0 })}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.card}>
          <p>{expensesLabel}</p>
          <p className={styles.cardText}>{formatCurrency({ amount: monthlyExpense! })}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.card}>
          <p>Balance </p>
          <p className={styles.cardText}>{formatCurrency({ amount: budget - monthlyExpense! })}</p>
        </div>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
