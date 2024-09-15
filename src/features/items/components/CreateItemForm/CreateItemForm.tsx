import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';

// Define the type for form data
interface CreateItemFormData {
  name: string;
}

const schema = yup.object({
  name: yup.string().required(),
});

const CreateItemForm = () => {
  const inputs: FormInputs[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      inputType: 'text',
      value: '',
      placeholder: 'Enter name',
    },
  ];

  const onSubmit = async (data: CreateItemFormData) => {
    console.log('submit', data);
  };

  return (
    <div className="flex justify-center">
      <Card variant="info">
        <p>Create Item</p>
        <Form<CreateItemFormData>
          isSubmitting={false}
          inputs={inputs}
          schema={schema}
          submitLabel="Create"
          submit={onSubmit}
        />
      </Card>
    </div>
  );
};

export default CreateItemForm;
