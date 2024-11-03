import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import { expensesAPI } from '@/features/expenses/api/expenses';
import useGenerateDateFromParams from '@/hooks/useGenerateDateFromParams';
import Spinner from '@/components/spinner';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import { accountBalanceAPI } from '@/features/accountBalance/api/accountBalance';

const schema = yup.object({
  amount: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Amount is required'),
  description: yup.string().required('Description is required'),
  account_budget_id: yup.string().required('Account is required'),
});

interface CreateExpenseFormProps {
  categoryID: string;
  closeModal?: () => void;
}

const CreateExpenseForm = ({ categoryID, closeModal }: CreateExpenseFormProps) => {
  const { mutateAsync: createExpense, isPending } = expensesAPI.useCreateExpense();

  const { activeDate } = useDateSelector();
  const { data } = accountBalanceAPI.useGetAccountBalances({ month: activeDate.month, year: activeDate.year });

  const generateCurrentDateFromParams = useGenerateDateFromParams();

  if (!data) return <Spinner />;

  const inputs: FormInputs[] = [
    {
      name: 'description',
      label: 'Description',
      inputType: 'text',
      value: '',
      placeholder: 'Enter Description',
    },
    {
      name: 'amount',
      label: 'Amount',
      inputType: 'currency',
      value: 0,
      placeholder: 'Enter Amount',
    },
    {
      name: 'is_recursive',
      label: 'Repeat Each Month',
      inputType: 'checkbox',
      value: false,
    },
    {
      name: 'account_budget_id',
      label: 'Account',
      inputType: 'select',
      value: '',
      options: data.data.map((accountBudget) => ({ label: accountBudget.account.name, value: accountBudget.id })),
    },
  ];

  const onSubmit = async (data: { description: string; amount: number; account_budget_id: string }) => {
    const date = generateCurrentDateFromParams();

    await createExpense({ ...data, date, category_id: categoryID });
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <div className="flex justify-center">
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
