import type { ICategoryBudget } from '@/features/dashboard/types/categoryBudget';
import { expenseAPI } from '@/features/expense/api/expense';
import { useMemo } from 'react';

interface useCalculateBudgetProps {
  categoriesBudget: ICategoryBudget[];
}

interface IRemainingBudgets {
  remainingBudgets: {
    remainingBudget: number;
    totalExpenses: number;
    id: number;

    category: {
      id: number;
      name: string;
    };
    amount: number;
    month: number;
    year: number;
  }[];
}

const useCalculateBudget = ({ categoriesBudget }: useCalculateBudgetProps): IRemainingBudgets => {
  const { data: expenses } = expenseAPI.useGetExpenses();

  const monthlyExpense = useMemo(() => {
    return expenses?.filter((expense) => {
      const currentDate = new Date();
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // First day of the current month
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Last day of the current month
      const expenseDate = new Date(expense.date);
      return expenseDate >= startOfMonth && expenseDate <= endOfMonth;
    });
  }, [expenses]);

  const calculateRemainingBudgetOfCategory = () => {
    // Initialize a map to store total expenses by category ID
    const categoryExpenseMap: { [key: string]: number } = {};

    // Calculate total expenses for each category
    monthlyExpense?.forEach((expense) => {
      const categoryId = expense.category.id; // Adjust based on your expense structure
      if (!categoryExpenseMap[categoryId]) {
        categoryExpenseMap[categoryId] = 0;
      }
      categoryExpenseMap[categoryId] += expense.amount;
    });

    // Calculate remaining budget for each category
    return categoriesBudget?.map((category) => {
      const totalExpenses = categoryExpenseMap[category.id] || 0;
      return {
        ...category,
        name: category.category.name,
        remainingBudget: category.amount - totalExpenses,
        totalExpenses, // Optional: Include total expenses for display
      };
    });
  };

  const remainingBudgets = calculateRemainingBudgetOfCategory();

  return {
    remainingBudgets,
  };
};

export default useCalculateBudget;

// !TODO This work but fix the naming and everything, for example category.category, or amount should be renamed to budget in a budget, etc
