import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import routes from '@/routes/routes';
import type { IFormResponse } from '@/types/formResponse';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const inputs: FormInputs[] = [
  {
    inputType: 'text',
    name: 'email',
    value: '',
    label: 'Email',
    placeholder: 'Enter your email',
  },
  {
    inputType: 'text',
    name: 'password',
    value: '',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  {
    inputType: 'text',
    name: 'confirm_password',
    value: '',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
  },
];

const schema = yup
  .object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    confirm_password: yup
      .string()

      .required('Confirm Password is required'),
  })
  .required();

const Signup = () => {
  const [response] = useState<IFormResponse | undefined>();

  const submit = async () => {};

  return (
    <div className="p-4">
      <Heading variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">something cool here</div>
      <Card variant="info">
        <Form
          inputs={inputs}
          submit={submit}
          submitLabel="Sign up"
          isSubmitting={false}
          response={response}
          schema={schema}
        />
        <p className="text-center">
          Already have an account?{' '}
          <Link className="text-blue-500 underline" to={routes.HOME()}>
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
