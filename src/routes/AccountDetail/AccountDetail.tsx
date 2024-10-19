import { accountBudgetAPI } from '@/features/accountBudget/api/accountBudget';
import CreateAccountBudgetForm from '@/features/accountBudget/components/CreateAccountBudgetForm';
import Modal from '@/components/modal';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import { useLocation, useParams } from 'react-router-dom';
import Spinner from '@/components/spinner';
import AccountMonthlyBudget from '@/features/accountBudget/components/AccountMonthlyBudget';
import PageHeader from '@/layout/PageHeader';

const AccountDetail = () => {
  const { activeDate } = useDateSelector();
  const { accountId } = useParams();
  const { state } = useLocation();

  const { data: accountBudget, isLoading } = accountBudgetAPI.useGetAccountBudget({
    year: activeDate.year,
    month: activeDate.month,
    accountId: accountId!,
  });
  console.log('accountBudget:', accountBudget);

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center gap-4">
        <Spinner />
      </div>
    );
  }

  if (!accountBudget) {
    return (
      <div className="flex justify-center flex-col items-center gap-4">
        <PageHeader backText="Accounts" title={state?.accountName} />
        <p> No Data</p>
        <Modal text="Create Account Budget" title="Create Account Budget">
          {({ closeModal }) => <CreateAccountBudgetForm closeModal={closeModal} />}
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center gap-4  ">
      <div className="flex flex-grow justify-between self-stretch">
        <PageHeader backText="Accounts" title={state?.accountName} />
      </div>
      <Modal text="Create Account Budget" title="Create Account Budget">
        {({ closeModal }) => <CreateAccountBudgetForm closeModal={closeModal} />}
      </Modal>
      <AccountMonthlyBudget budget={accountBudget.data} />
    </div>
  );
};

export default AccountDetail;
