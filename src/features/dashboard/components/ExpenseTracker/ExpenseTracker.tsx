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
  card: 'flex flex-col gap-2 items-center min-w-44',
  cardText: 'text-white font-bold',
};

const ExpenseTracker = ({ budgetLabel, expensesLabel, expenses, budget }: ExpenseTrackerProps) => {
  const monthlyExpense = useMemo(() => {
    if (!expenses || expenses.length === 0) return 0;

    const monthExpenses = expenses?.filter((expense) => {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // First day of the current month
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of the current month
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
    });

    return monthExpenses?.reduce((acc, expense) => acc + Number(expense.amount), 0);
  }, [expenses]);

  return (
    <div className="flex gap-10 justify-center">
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
          <p className={styles.cardText}>{formatCurrency({ amount: budget - monthlyExpense })}</p>
        </div>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
