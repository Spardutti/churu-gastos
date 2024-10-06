import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import useCreateAccount from '@/features/account/hooks/useCreateAccount';
import type { IAccount } from '@/features/account/type/IAccount';
import * as yup from 'yup';

interface CreateAccountForm {
  closeModal?: () => void;
}

const CreateAccountForm = ({ closeModal }: CreateAccountForm) => {
  const { createAccount, isLoading } = useCreateAccount({ closeModal });

  return (
    <div className="flex justify-center">
      <Form<IAccount>
        isSubmitting={isLoading}
        inputs={inputs}
        schema={schema}
        submitLabel="Create"
        submit={createAccount}
        className="flex-col"
      />
    </div>
  );
};

export default CreateAccountForm;

const inputs: FormInputs[] = [
  {
    label: 'Name',
    name: 'name',
    inputType: 'text',
    value: '',
  },
  {
    label: 'Description',
    name: 'description',
    inputType: 'text',
    value: '',
  },
];

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});
