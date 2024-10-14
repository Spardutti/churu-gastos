import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import { accountAPI } from '@/features/account/api/account';
import useCreateAccountBudget from '@/features/accountBudget/hooks/useCreateAccountBalance';
import * as yup from 'yup';

interface CreateAccountBudgetFormProps {
  closeModal?: () => void;
}

const CreateAccountBudgetForm = ({ closeModal }: CreateAccountBudgetFormProps) => {
  const { createBudget, isLoading } = useCreateAccountBudget({ closeModal });
  const { data: accounts } = accountAPI.useGetAccounts();

  const accountsOptions = accounts?.data?.map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const inputs: FormInputs[] = [
    {
      label: 'Account',
      name: 'category_id',
      inputType: 'select',
      value: '',
      options: accountsOptions ?? [],
    },
    {
      label: 'Amount',
      name: 'amount',
      inputType: 'currency',
      value: 0,
    },
  ];

  return (
    <div className="flex justify-center">
      <Form<{ category_id: string; amount: number }>
        isSubmitting={isLoading}
        inputs={inputs}
        schema={schema}
        submitLabel="Create"
        submit={createBudget}
        className="flex-col"
      />
    </div>
  );
};

export default CreateAccountBudgetForm;

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});
