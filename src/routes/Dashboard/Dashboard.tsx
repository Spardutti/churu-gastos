import Heading from '@/components/heading';
import { categoriesAPI } from '@/features/category/api/categories';
import Categories from '@/features/category/components/Categories';
import CreateCategoryForm from '@/features/category/components/CreateCategoryForm/CreateCategoryForm';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import MonthSelector from '@/features/month/components/MonthSelector';
// import { useMediaQuery } from 'react-responsive';
import Layout from '@/layout/Layout';
import { yearAndMonth } from '@/utils/yearAndMonth';
import { useMemo } from 'react';

const { year, month } = yearAndMonth();

const Dashboard = () => {
  // const isDesktop = useMediaQuery({
  //   query: '(min-width: 875px)',
  // });

  const { data: expenses } = expensesAPI.useGetExpenses({ year, month });

  const { data: categories } = categoriesAPI.useGetCategories({ year, month });

  const monthlyExpense = useMemo(() => {
    if (!expenses) return 0;
    return expenses.data.reduce((acc, expense) => {
      return acc + Number(expense.amount);
    }, 0);
  }, [expenses]);

  return (
    <Layout>
      <MonthSelector />
      <div className="flex flex-col gap-10">
        <ExpenseTracker
          expenses={monthlyExpense}
          expensesLabel="Monthly Expenses"
          budgetLabel="Monthly Budget"
          budget={categories?.monthly_budget || 0}
        />
        <CreateCategoryForm />
        <div className="text-center">
          <Heading variant="h4" label="Choose a category to see the details" />
        </div>
        <Categories />
      </div>
    </Layout>
  );
};

export default Dashboard;
