import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import { itemAPI } from '@/features/items/api/items';
import type { IItem } from '@/features/items/types/types';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

const inputs: FormInputs[] = [
  {
    name: 'name',
    label: 'Name',
    inputType: 'text',
    value: '',
    placeholder: 'Enter name',
  },

  {
    name: 'description',
    label: 'Description',
    inputType: 'text',
    value: '',
    placeholder: 'Enter description',
  },
];

const schema = yup.object({
  name: yup.string().required(),
});

const CreateItemForm = () => {
  const { mutateAsync: createItem } = itemAPI.useCreateItem();
  const onSubmit = async (data: IItem) => {
    const r = await createItem({ ...data, id: uuidv4() });
    console.log('submit', r);
  };

  return (
    <div className="flex justify-center">
      <Card variant="info">
        <p>Create Item</p>
        <Form<IItem> isSubmitting={false} inputs={inputs} schema={schema} submitLabel="Create" submit={onSubmit} />
      </Card>
    </div>
  );
};

export default CreateItemForm;
