import type { IExpense } from '@/features/expenses/types/IExpense';
import { formatCurrency } from '@/utils/formatCurrency';
import { useMemo } from 'react';

interface ExpenseTrackerProps {
  budgetLabel: string;
  expensesLabel: string;
  expenses: IExpense[];
  budget: number;
}

const ExpenseTracker = ({ budgetLabel, expensesLabel, expenses, budget }: ExpenseTrackerProps) => {
  const monthlyExpense = useMemo(() => {
    if (!expenses) return 0;

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
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 items-center">
        <p>{budgetLabel}</p>
        {formatCurrency({ amount: budget || 0 })}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p>{expensesLabel}</p>
        {formatCurrency({ amount: monthlyExpense! })}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p>Balance </p>
        {formatCurrency({ amount: budget - monthlyExpense })}
      </div>
    </div>
  );
};

export default ExpenseTracker;
