import Button from '@/components/button';
import Heading from '@/components/heading';
import Modal from '@/components/modal';
import { categoriesAPI } from '@/features/category/api/categories';
import Categories from '@/features/category/components/Categories';
import CreateCategoryForm from '@/features/category/components/CreateCategoryForm/CreateCategoryForm';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import { monthAPI } from '@/features/month/api/month';
import MonthSelector from '@/features/month/components/MonthSelector';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import useGenerateDateFromParams from '@/hooks/useGenerateDateFromParams';
// import { useMediaQuery } from 'react-responsive';
import { useMemo } from 'react';

const Dashboard = () => {
  // const isDesktop = useMediaQuery({
  //   query: '(min-width: 875px)',
  // });

  const { activeDate } = useDateSelector();
  const generateCurrentDateFromParams = useGenerateDateFromParams();

  const { data: expenses } = expensesAPI.useGetExpenses({ year: activeDate.year, month: activeDate.month });

  const { data: categories, refetch: refetchCategories } = categoriesAPI.useGetCategories({
    year: activeDate.year,
    month: activeDate.month,
  });

  const { mutateAsync: generateNewMonth, isPending } = monthAPI.useGenerateCategories();

  const monthlyExpense = useMemo(() => {
    if (!expenses) return 0;
    return expenses.data.reduce((acc, expense) => {
      return acc + Number(expense.amount);
    }, 0);
  }, [expenses]);

  const onNewMonth = async () => {
    const date = generateCurrentDateFromParams();

    await generateNewMonth({ date });
    refetchCategories();
  };

  return (
    <>
      <MonthSelector />
      <div className="flex flex-col gap-10">
        <ExpenseTracker
          expenses={monthlyExpense}
          expensesLabel="Monthly Expenses"
          budgetLabel="Monthly Budget"
          budget={categories?.monthlyBudget || 0}
        />
        <div className="flex justify-center">
          <Modal text="Create Category" title="Create Category">
            {({ closeModal }) => <CreateCategoryForm closeModal={closeModal} />}
          </Modal>
        </div>
        <div className="text-center">
          <Heading color="default" variant="h4" label="Choose a category to see the details" />
        </div>
        <Categories />
        {categories?.isNewMonth && (
          <div className="flex justify-center">
            <Button text="Copy categories" variant="primary" onClick={onNewMonth} isLoading={isPending} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;

// TODO Include the account_budget_id in the expense and unique expense creation
