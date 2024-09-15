import Card from '@/components/card';
import { budgetAPI } from '@/features/dashboard/api/budget';
import { expensesAPI } from '@/features/expenses/api/expenses';
import { formatCurrency } from '@/utils/formatCurrency';
import { useMemo } from 'react';

interface ExpenseTrackerProps {}

const ExpenseTracker = () => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const { data: categoriesBudget } = budgetAPI.useGetBudget({ query: `month=${month}&year=${year}` });

  const { data: expenses } = expensesAPI.useGetExpenses();

  const formatDate = (date) => {
    // Ensure the date is valid
    if (!(date instanceof Date) || isNaN(date)) {
      throw new Error('Invalid date');
    }

    return date.toISOString().split('T')[0]; // Get the date part
  };

  const monthlyExpense = useMemo(() => {
    const monthExpenses = expenses?.filter((expense) => {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // First day of the current month
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of the current month
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
    });

    return monthExpenses?.reduce((acc, expense) => acc + Number(expense.amount), 0);
  }, [expenses]);

  const totalBudget = useMemo(() => {
    return categoriesBudget?.reduce((acc, budget) => acc + Number(budget.budget), 0);
  }, [categoriesBudget]);

  return (
    <div className="flex justify-between">
      <div className="">
        <Card variant="info">
          <div className="flex flex-col gap-2 items-center">
            <p>Expenses Budget</p>
            {formatCurrency({ amount: monthlyExpense! })}
          </div>{' '}
        </Card>
      </div>

      <div className="">
        <Card variant="info">
          <div className="flex flex-col gap-2 items-center">
            <p>Balance </p>
            {formatCurrency({ amount: totalBudget! - monthlyExpense! })}
          </div>{' '}
        </Card>
      </div>

      <div className="">
        <Card variant="info">
          <div className="flex flex-col gap-2 items-center">
            <p>Monthly Budget</p>
            {formatCurrency({ amount: totalBudget! })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;
