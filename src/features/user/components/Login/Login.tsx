import Card from '@/components/card';
import Form from '@/components/form';
import { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { strings } from '@/constants/strings';
import { setUser } from '@/features/user/store/userSlice';
import routes from '@/routes/routes';
import { useLoginMutation } from '@/store/api';
import { ApiError } from '@/store/types';
import { IFormResponse } from '@/types/formResponse';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

type FormData = {
  email: string;
  password: string;
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
    type: 'text',
    value: '',
    label: 'Password',
    placeholder: 'Enter your password',
  },
];

const schema = yup
  .object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const [response, setResponse] = useState<IFormResponse | undefined>();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const submit = async (data: FormData) => {
    const response = await login(data);

    if (response.error) {
      const error = response.error as ApiError;
      setResponse({ type: 'error', message: error.data?.errors! || 'Something went wrong' });
    } else {
      dispatch(setUser(response.data.user!));
      localStorage.setItem(strings.token, response.data.user!.token);
      navigate(routes.DASHBOARD());
    }
  };

  return (
    <div className="p-4">
      <Heading variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">
        something cool here
      </div>
      <Card>
        <Form
          inputs={inputs}
          submit={submit}
          submitLabel="Log in"
          isSubmitting={isLoading}
          response={response}
          schema={schema}
        />
        <p className="text-center">
          Don't have an account?{' '}
          <Link className="text-blue-500 underline" to={routes.SIGNUP()}>
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
