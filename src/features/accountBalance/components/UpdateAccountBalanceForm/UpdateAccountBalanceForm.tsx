import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import useUpdateAccountBalance from '@/features/accountBalance/hooks/useUpdateAccountBalance';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
  budget: yup.string().required('Amount is required'),
});

interface UpdateAccountBalanceFormProps {
  closeModal?: () => void;
  accountBalanceId: string;
  accountBalance: number;
}

const UpdateAccountBalanceForm = ({ closeModal, accountBalanceId, accountBalance }: UpdateAccountBalanceFormProps) => {
  const { accountId } = useParams();
  const { updateBalance, isLoading } = useUpdateAccountBalance();

  const onSubmit = async ({ budget }: { budget: number }) => {
    if (!accountId) return;

    updateBalance({ budget, id: accountBalanceId });

    if (closeModal) {
      closeModal();
    }
  };

  const inputs: FormInputs[] = [
    {
      inputType: 'currency',
      name: 'budget',
      label: 'Account Balance',
      value: accountBalance,
    },
  ];

  return (
    <Form
      inputs={inputs}
      schema={schema}
      submit={onSubmit}
      submitLabel="Update"
      className="flex flex-col"
      isSubmitting={isLoading}
    />
  );
};

export default UpdateAccountBalanceForm;
