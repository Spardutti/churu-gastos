import Form from '@/components/form';
import { FormInputs } from '@/components/form/types';
import { useSignupMutation } from '@/store/api';
import { ApiError } from '@/store/types';
import { IFormResponse } from '@/types/formResponse';
import { useState } from 'react';
import * as yup from 'yup';

interface SignupProps {}

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
    confirm_password: yup.string().test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
  }).required('Confirm Password is required'),
  })
  .required();

const Signup = () => {
  const [response, setResponse] = useState<IFormResponse | undefined>();

  const [signup, { isLoading }] = useSignupMutation();

  const submit = async (data: FormData) => {
    const response = await signup(data);

    if (response.error) {
      const error = response.error as ApiError;
      setResponse({ type: 'error', message: error.data.message });
    } else {
      setResponse({ type: 'success', message: 'Signup successful' });
    }
  };

  return (
    <div className="flex flex-grow md:max-w-[400px] shadow-md px-4 py-2 rounded-md rounded-tl-none bg-main-primary">
      <Form inputs={inputs} submit={submit} submitLabel="Log in" isSubmitting={isLoading} response={response} schema={schema}/>
    </div>
  );
};

export default Signup;
