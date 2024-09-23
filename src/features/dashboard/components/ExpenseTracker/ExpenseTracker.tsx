import Card from '@/components/card';
import { formatCurrency } from '@/utils/formatCurrency';
import { useMemo } from 'react';

interface ExpenseTrackerProps {
  budgetLabel: string;
  expensesLabel: string;
  expenses: number;
  budget: number;
  extraExpenses?: number;
}

const styles = {
  card: 'flex flex-col gap-2 items-center lg:min-w-44',
  cardText: 'text-white font-bold',
};

const ExpenseTracker = ({ budgetLabel, expensesLabel, expenses, budget, extraExpenses }: ExpenseTrackerProps) => {
  const expenseTotal = useMemo(() => {
    if (extraExpenses) {
      return extraExpenses + expenses;
    }
    return expenses;
  }, [expenses, extraExpenses]);

  return (
    <div className="flex lg:flex-row flex-col gap-4 lg:gap-10 justify-center">
      <Card>
        <div className={styles.card}>
          <p>{budgetLabel}</p>
          <p className={styles.cardText}>{formatCurrency({ amount: budget })}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.card}>
          <p>{expensesLabel}</p>
          <p className={styles.cardText}>{formatCurrency({ amount: expenseTotal })}</p>
        </div>
      </Card>
      <Card>
        <div className={styles.card}>
          <p>Balance </p>
          <p className={styles.cardText}>{formatCurrency({ amount: budget - expenses })}</p>
        </div>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
