import Card from '@/components/card';
import Form from '@/components/form';
import { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import routes from '@/routes/routes';
import { useSignupMutation } from '@/store/api';
import { ApiError } from '@/store/types';
import { IFormResponse } from '@/types/formResponse';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const inputs: FormInputs[] = [
  {
    inputType: 'text',
    name: 'email',
    type: 'text',
    value: '',
    label: 'Email',
    placeholder: 'Enter your email',
  },
  {
    inputType: 'text',
    name: 'password',
    type: 'password',
    value: '',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  {
    inputType: 'text',
    name: 'confirm_password',
    type: 'password',
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
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      })
      .required('Confirm Password is required'),
  })
  .required();

const Signup = () => {
  const [response, setResponse] = useState<IFormResponse | undefined>();

  const [signup, { isLoading }] = useSignupMutation();

  const submit = async (data: FormData) => {
    const response = await signup(data);

    if (response.error) {
      const error = response.error as ApiError;
      setResponse({ type: 'error', message: error.data?.errors! });
    } else {
      setResponse({ type: 'success', message: 'Signup successful' });
    }
  };

  return (
    <div className="p-4">
      <Heading variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">something cool here</div>
      <Card>
        <Form
          inputs={inputs}
          submit={submit}
          submitLabel="Sign up"
          isSubmitting={isLoading}
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
