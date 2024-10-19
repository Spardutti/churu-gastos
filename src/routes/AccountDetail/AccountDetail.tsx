import { accountBudgetAPI } from '@/features/accountBudget/api/accountBudget';
import CreateAccountBudgetForm from '@/features/accountBudget/components/CreateAccountBudgetForm';
import Modal from '@/components/modal';
import Heading from '@/components/heading';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import { useLocation, useParams } from 'react-router-dom';
import Spinner from '@/components/spinner';

const AccountDetail = () => {
  const { activeDate } = useDateSelector();
  const { accountId } = useParams();
  const { state } = useLocation();

  const { data, isPending } = accountBudgetAPI.useGetAccountBudget({
    year: activeDate.year,
    month: activeDate.month,
    accountId: accountId!,
  });

  if (isPending) {
    return (
      <div className="flex justify-center flex-col items-center gap-4">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center flex-col items-center gap-4">
        <Heading label={state?.accountName} variant="h4" />
        <p> No Data</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <Heading label={data.data.account.name} variant="h4" />
      <Modal text="Create Account Budget" title="Create Account Budget">
        {({ closeModal }) => <CreateAccountBudgetForm closeModal={closeModal} />}
      </Modal>
    </div>
  );
};

export default AccountDetail;
