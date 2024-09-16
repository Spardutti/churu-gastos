import { categoriesAPI } from '@/features/category/api/categories';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import CreateExpenseForm from '@/features/expenses/components/CreateExpenseForm';
import ExpenseTable from '@/features/expenses/components/ExpenseTable';
import Layout from '@/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '@/components/spinner';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Button from '@/components/button';

interface CategoryProps {}

const Category = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();

  const { data: category, isPending } = categoriesAPI.useGetCategory({ categoryID: categoryID! });

  const { data: expenses } = expensesAPI.useGetExpenses({ query: `categoryID=${category?.id}` });

  const onClick = () => {
    navigate(-1);
  };

  if (!category || isPending) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className="space-y-4">
        <Button variant="ghost" type="button" onClick={onClick} text={category.name} prependIcon={<ArrowLeftIcon />} />

        <ExpenseTracker budgetLabel="Budget" expensesLabel="Expenses" expenses={expenses!} budget={category.budget} />
        <CreateExpenseForm categoryID={categoryID!} />

        <ExpenseTable categoryID={categoryID!} />
      </div>
    </Layout>
  );
};

export default Category;
