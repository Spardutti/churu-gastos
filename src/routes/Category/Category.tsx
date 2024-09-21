import { categoriesAPI } from '@/features/category/api/categories';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import CreateExpenseForm from '@/features/expenses/components/CreateExpenseForm';
import Layout from '@/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '@/components/spinner';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Button from '@/components/button';
import ExpenseTable from '@/features/expenses/components/ExpenseTable';

const Category = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();

  const { data: category, isPending } = categoriesAPI.useGetCategory({ categoryID: categoryID! });

  const { data: expenses } = expensesAPI.useGetExpenses({ year: '2024', month: '9', categoryID });

  const onClick = () => {
    navigate(-1);
  };

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
        <div>
          <Button
            variant="ghost"
            type="button"
            onClick={onClick}
            text={category.data.name}
            prependIcon={<ArrowLeftIcon />}
          />
        </div>

        <ExpenseTracker
          budgetLabel="Budget"
          expensesLabel="Expenses"
          expenses={expenses?.data}
          budget={category.data.budget || 0}
        />
        <CreateExpenseForm categoryID={categoryID!} />

        <ExpenseTable categoryID={categoryID!} />
      </div>
    </Layout>
  );
};

export default Category;
