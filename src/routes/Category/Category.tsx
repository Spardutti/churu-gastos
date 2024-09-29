import { categoriesAPI } from '@/features/category/api/categories';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import CreateExpenseForm from '@/features/expenses/components/CreateExpenseForm';
import Layout from '@/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '@/components/spinner';
import { ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons';
import Button from '@/components/button';
import ExpenseTable from '@/features/expenses/components/ExpenseTable';
import { useMemo } from 'react';
import useDateSelector from '@/features/month/hooks/useDateSelector';

const Category = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();

  const { activeDate } = useDateSelector();

  const { data: category, isPending } = categoriesAPI.useGetCategory({ categoryID: categoryID! });

  const { data: expenses } = expensesAPI.useGetExpenses({ year: activeDate.year, month: activeDate.month, categoryID });

  const { mutateAsync: deleteCategory, isPending: isDeleting } = categoriesAPI.useDeleteCategory();

  const onClick = () => {
    navigate(-1);
  };

  const onDelete = async () => {
    await deleteCategory({ categoryID: categoryID! });
    navigate(-1);
  };

  const monthlyExpense = useMemo(() => {
    if (!expenses || expenses?.data.length === 0) return 0;
    return expenses.data.reduce((acc, expense) => {
      return acc + Number(expense.amount);
    }, 0);
  }, [expenses]);

  if (!category || isPending) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-grow justify-between">
          <Button
            variant="ghost"
            type="button"
            onClick={onClick}
            text={category.data.name}
            prependIcon={<ArrowLeftIcon />}
          />
          <Button
            variant="danger"
            type="button"
            text="Delete"
            prependIcon={<TrashIcon />}
            onClick={onDelete}
            isLoading={isDeleting}
          />
        </div>

        <ExpenseTracker
          budgetLabel="Budget"
          expensesLabel="Expenses"
          expenses={monthlyExpense}
          budget={category.data.budget || 0}
        />
        <CreateExpenseForm categoryID={categoryID!} />

        <ExpenseTable categoryID={categoryID!} />
      </div>
    </Layout>
  );
};

export default Category;
