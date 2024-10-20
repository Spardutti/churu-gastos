import { accountBudgetAPI } from '@/features/accountBudget/api/accountBudget';
import CreateAccountBudgetForm from '@/features/accountBudget/components/CreateAccountBudgetForm';
import Modal from '@/components/modal';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import { useLocation, useParams } from 'react-router-dom';
import Spinner from '@/components/spinner';
import AccountMonthlyBudget from '@/features/accountBudget/components/AccountMonthlyBudget';
import PageHeader from '@/layout/PageHeader';
import AccountBudgetExpenses from '@/features/accountBudgetExpenses/components/AccountBudgetExpenses';

const AccountDetail = () => {
  const { activeDate } = useDateSelector();
  const { accountId } = useParams();
  const { state } = useLocation();

  const { data: accountBudget, isLoading } = accountBudgetAPI.useGetAccountBudget({
    year: activeDate.year,
    month: activeDate.month,
    accountId: accountId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center gap-4">
        <Spinner />
      </div>
    );
  }

  if (!accountBudget || !accountBudget.data) {
    return (
      <div className="flex justify-center flex-col items-center gap-4">
        <PageHeader backText="Accounts" title={state?.accountName} />
        <p> No budget found for this month, please create one below</p>
        <Modal text="Create Account Budget" title="Create Account Budget">
          {({ closeModal }) => <CreateAccountBudgetForm closeModal={closeModal} />}
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center gap-6 ">
      <div className="flex flex-grow justify-between self-stretch">
        <PageHeader subtitle={accountBudget.data.account?.description} backText="Accounts" title={state?.accountName} />
      </div>

      <AccountMonthlyBudget budget={accountBudget.data} />
      <AccountBudgetExpenses accountBudgetId={accountBudget.data.id} />
    </div>
  );
};

export default AccountDetail;
