import { categoriesAPI } from '@/features/category/api/categories';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import CreateExpenseForm from '@/features/expenses/components/CreateExpenseForm';
import { useParams } from 'react-router-dom';
import Spinner from '@/components/spinner';
import Button from '@/components/button';
import ExpenseTable from '@/features/expenses/components/ExpenseTable';
import { useMemo } from 'react';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import useNavigateWithParams from '@/hooks/useNavigateWithParams';
import routes from '@/routes/routes';
import MonthSelector from '@/features/month/components/MonthSelector';
import Modal from '@/components/modal';
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';

const Category = () => {
  const { categoryID } = useParams();
  const onNavigate = useNavigateWithParams();

  const { activeDate } = useDateSelector();

  const { data: category, isPending } = categoriesAPI.useGetCategory({ categoryID: categoryID! });

  const { data: expenses } = expensesAPI.useGetExpenses({ year: activeDate.year, month: activeDate.month, categoryID });

  const { mutateAsync: deleteCategory, isPending: isDeleting } = categoriesAPI.useDeleteCategory();

  const onClick = () => {
    onNavigate({ pathname: routes.DASHBOARD() });
  };

  const onDelete = async () => {
    await deleteCategory({ categoryID: categoryID! });
    onNavigate({ pathname: routes.DASHBOARD() });
  };

  const monthlyExpense = useMemo(() => {
    if (!expenses || expenses?.data.length === 0) return 0;
    return expenses.data.reduce((acc, expense) => {
      return acc + Number(expense.amount);
    }, 0);
  }, [expenses]);

  if (!category || isPending) {
    return <Spinner />;
  }

  return (
    <>
      <MonthSelector allowSelection={false} />
      <div className="flex flex-col gap-10">
        <div className="flex flex-grow justify-between">
          <Button
            variant="ghost"
            type="button"
            onClick={onClick}
            text={category.data.name}
            prependIcon={<IconArrowLeft />}
          />
          <Button
            variant="danger"
            type="button"
            text="Delete"
            prependIcon={<IconTrash />}
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
        <div className="flex justify-center">
          <Modal text="Create Expense" title="Create Expense">
            {({ closeModal }) => <CreateExpenseForm categoryID={categoryID!} closeModal={closeModal} />}
          </Modal>
        </div>

        <ExpenseTable categoryID={categoryID!} />
      </div>
    </>
  );
};

export default Category;
