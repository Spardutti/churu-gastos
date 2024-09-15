import Card from '@/components/card';
import { expensesAPI } from '@/features/expenses/api/expenses';
import { itemAPI } from '@/features/items/api/items';
import type { IItem } from '@/features/items/types/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useMemo } from 'react';

interface ExpenseTrackerProps {}

const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const ExpenseTracker = () => {
  const { data: items } = itemAPI.useGetItems();

  const { data: expenses } = expensesAPI.useGetExpenses();

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

  const filterItemsByYearAndMonth = ({
    items,
    targetYear,
    targetMonth,
  }: {
    items: IItem[];
    targetYear: number;
    targetMonth: number;
  }) => {
    return items?.filter((item) => {
      if (!item.date) return false; // Skip items without a date

      const date = new Date(item.date);

      // Extract year and month
      const itemYear = date.getFullYear();
      const itemMonth = date.getMonth() + 1; // getMonth() is zero-based

      // Check if the item's year and month match the target year and month
      return itemYear === targetYear && itemMonth === targetMonth;
    });
  };

  const totalBudget = useMemo(() => {
    const thisMonthItems = filterItemsByYearAndMonth({ items: items!, targetYear: year, targetMonth: month });
    return thisMonthItems?.reduce((acc, item) => acc + Number(item.budget), 0);
  }, [items]);

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
