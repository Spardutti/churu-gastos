import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import { accountAPI } from '@/features/account/api/account';
import useCreateAccountBudget from '@/features/accountBalance/hooks/useCreateAccountBalance';
import * as yup from 'yup';

interface CreateAccountBudgetFormProps {
  closeModal?: () => void;
}

const CreateAccountBudgetForm = ({ closeModal }: CreateAccountBudgetFormProps) => {
  const { createBudget, isLoading, error } = useCreateAccountBudget({ closeModal });
  const { data: accounts } = accountAPI.useGetAccounts();

  const accountsOptions = accounts?.data?.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const inputs: FormInputs[] = [
    {
      label: 'Account',
      name: 'account_id',
      inputType: 'select',
      value: '',
      options: accountsOptions ?? [],
      placeholder: 'Select an account',
    },
    {
      label: 'Budget',
      name: 'budget',
      inputType: 'currency',
      value: 0,
    },
  ];

  return (
    <div className="flex justify-center">
      <Form<{ account_id: string; budget: number }>
        isSubmitting={isLoading}
        inputs={inputs}
        schema={schema}
        submitLabel="Create"
        submit={createBudget}
        className="flex-col"
        response={error && { message: error.message, type: 'error' }}
      />
    </div>
  );
};

export default CreateAccountBudgetForm;

const schema = yup.object({
  account_id: yup.string().required('Category is required'),
  budget: yup.string().required('Amount is required'),
});
