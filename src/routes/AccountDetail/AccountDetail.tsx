import CreateAccountBudgetForm from '@/features/accountBalance/components/CreateAccountBalanceForm';
import Modal from '@/components/modal';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import { useLocation, useParams } from 'react-router-dom';
import Spinner from '@/components/spinner';
import PageHeader from '@/layout/PageHeader';
import AccountBudgetExpenses from '@/features/accountBudgetExpenses/components/AccountBudgetExpenses';
import { accountBalanceAPI } from '@/features/accountBalance/api/accountBalance';
import UpdateAccountBalanceForm from '@/features/accountBalance/components/UpdateAccountBalanceForm';
import AccountMonthlyBalance from '@/features/accountBalance/components/AccountMonthlyBalance';

const AccountDetail = () => {
  const { activeDate } = useDateSelector();
  const { accountId } = useParams();
  const { state } = useLocation();

  const { data: accountBalance, isLoading } = accountBalanceAPI.useGetAccountBalance({
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

  if (!accountBalance || !accountBalance.data) {
    return (
      <div className="flex justify-center flex-col items-center gap-4">
        <PageHeader backText="Accounts" title={state?.accountName} />
        <p> No budget found for this month, please create one below</p>
        <Modal text="Create Account Balance" title="Create Account Balance">
          {({ closeModal }) => <CreateAccountBudgetForm closeModal={closeModal} />}
        </Modal>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center gap-6 ">
      <div className="flex flex-grow justify-between self-stretch">
        <PageHeader subtitle={accountBalance.data.account?.description} backText="Accounts" title={state?.accountName}>
          <Modal text="Edit" title="Update">
            {({ closeModal }) => (
              <UpdateAccountBalanceForm
                accountBalanceId={accountBalance.data.id}
                accountBalance={accountBalance.data.budget}
                closeModal={closeModal}
              />
            )}
          </Modal>
        </PageHeader>
      </div>

      <AccountMonthlyBalance budget={accountBalance.data} />
      <AccountBudgetExpenses accountBudgetId={accountBalance.data.id} />
    </div>
  );
};

export default AccountDetail;
