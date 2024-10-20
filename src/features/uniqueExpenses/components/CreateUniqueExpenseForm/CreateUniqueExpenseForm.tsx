import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import { uniqueExpenseAPI } from '@/features/uniqueExpenses/api/uniqueExpenses';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import { accountBudgetAPI } from '@/features/accountBudget/api/accountBudget';
import Spinner from '@/components/spinner';

const schema = yup.object({
  amount: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Amount is required')
    .test('is-positive', 'Amount must be positive', (value) => value > 0),
  name: yup.string().required('Name is required'),
});

interface FormProps {
  closeModal: () => void;
}

const CreateExpenseForm = ({ closeModal }: FormProps) => {
  const { mutateAsync: createUniqueExpense, isPending } = uniqueExpenseAPI.useCreateUniqueExpense();

  const { activeDate } = useDateSelector();
  const { data } = accountBudgetAPI.useGetAccountBudgets({ month: activeDate.month, year: activeDate.year });

  const onSubmit = async (data: { description: string; amount: number; account_budget_id: string }) => {
    await createUniqueExpense(data);
    closeModal();
  };

  if (!data) return <Spinner />;

  const inputs: FormInputs[] = [
    {
      name: 'description',
      label: 'Description',
      inputType: 'text',
      value: '',
      placeholder: 'Enter Name',
    },
    {
      name: 'amount',
      label: 'Amount',
      inputType: 'currency',
      value: 0,
      placeholder: 'Enter Amount',
    },
    {
      name: 'account_budget_id',
      label: 'Account',
      inputType: 'select',
      value: '',
      options: data.data.map((accountBudget) => ({ label: accountBudget.account.name, value: accountBudget.id })),
    },
  ];

  return (
    <div className="flex justify-center self-stretch">
      <Form<{ description: string; amount: number; account_budget_id: string }>
        isSubmitting={isPending}
        inputs={inputs}
        schema={schema}
        submitLabel="Create"
        submit={onSubmit}
        className="flex-col"
      />
    </div>
  );
};

export default CreateExpenseForm;
