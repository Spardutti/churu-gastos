import type { ICategoryBudget } from '@/features/dashboard/types/ICategoryBudget';
import { expensesAPI } from '@/features/expenses/api/expenses';
import { itemAPI } from '@/features/items/api/items';
import { useMemo } from 'react';

interface useCalculateBudgetProps {
  categoriesBudget: ICategoryBudget[];
}

export interface IRemainingBudgets {
  remainingBudget: number;
  totalExpenses: number;
  id: number;

  category: {
    id: number;
    name: string;
  };
  budget: number;
  month: number;
  year: number;
}

const useCalculateBudget = ({ categoriesBudget }: useCalculateBudgetProps): IRemainingBudgets[] => {
  const { data: expenses } = expensesAPI.useGetExpenses();

  const monthlyExpense = useMemo(() => {
    return expenses?.filter((item) => {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // First day of the current month
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of the current month

      const expenseDate = new Date(item.date);

      return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
    });
  }, [expenses]);

  const calculateRemainingBudgetOfCategory = () => {
    // Initialize a map to store total expenses by category ID
    const categoryExpenseMap: { [key: string]: number } = {};

    // Calculate total expenses for each category
    monthlyExpense?.forEach((item) => {
      const categoryId = item.category.id; // Adjust based on your expense structure
      if (!categoryExpenseMap[categoryId]) {
        categoryExpenseMap[categoryId] = 0;
      }
      categoryExpenseMap[categoryId] += item.amount;
    });

    // Calculate remaining budget for each category
    return categoriesBudget?.map((category) => {
      const totalExpenses = categoryExpenseMap[category.id] || 0;
      return {
        ...category,
        name: category.category.name,
        remainingBudget: category.budget - totalExpenses,
        totalExpenses,
      };
    });
  };

  const remainingBudgets = calculateRemainingBudgetOfCategory();

  return remainingBudgets;
};

export default useCalculateBudget;
