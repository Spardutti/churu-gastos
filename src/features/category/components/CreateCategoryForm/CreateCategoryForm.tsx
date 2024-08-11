import Form from '@/components/form';
import { FormInputs } from '@/components/form/types';
import { Category } from '@/features/category/types/category';
import { useCreateCategoryMutation } from '@/store/api';
import React from 'react';

interface categoryFormProps {}

const inputs: FormInputs[] = [
  {
    type: 'text',
    value: '',
    label: 'Category Name',
    name: 'name',
    placeholder: 'Category name',
    inputType: 'text',
  },
];

const CreateCategoryForm: React.FC<categoryFormProps> = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (data: Category) => {
    createCategory(data);
  };
  return <Form inputs={inputs} submitLabel="Create" isSubmitting={isLoading} submit={handleSubmit}></Form>;
};

export default CreateCategoryForm;
