import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import Heading from '@/components/heading';
import { creditCardAPI } from '@/features/creditCard/api/creditCard';
import type { ICreditCard } from '@/features/creditCard/types/ICreditCard';

const inputs: FormInputs[] = [
  {
    name: 'name',
    label: 'Name',
    inputType: 'text',
    value: '',
    placeholder: 'Enter Name',
  },
  {
    name: 'card_type',
    label: 'Card Type',
    inputType: 'text',
    value: '',
    placeholder: 'Visa, Master Card, etc',
  },
  {
    name: 'card_last_4',
    label: 'Last 4 Digits',
    inputType: 'number',
    value: 0,
    placeholder: 'Enter Last 4 Digits',
  },
];

const schema = yup.object({
  name: yup.string().required('Name is required'),
  card_type: yup.string().required('Card Type is required'),
});

const CreateCreditCardForm = () => {
  const { mutateAsync: createCreditCard, isPending } = creditCardAPI.useCreateCreditCard();

  const onSubmit = async (data: ICreditCard) => {
    await createCreditCard(data);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 lg:flex-grow-0 flex-grow">
        <Card>
          <Heading label="Create Credit Card" variant="h5" />
          <Form<ICreditCard>
            isSubmitting={isPending}
            inputs={inputs}
            schema={schema}
            submitLabel="Create"
            submit={onSubmit}
            className="lg:flex-row flex-col"
          />
        </Card>
      </div>
    </div>
  );
};

export default CreateCreditCardForm;
