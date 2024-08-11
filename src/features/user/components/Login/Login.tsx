import Form from '@/components/form';
import { FormInputs } from '@/components/form/types';
import { strings } from '@/constants/strings';
import { setUser } from '@/features/user/store/userSlice';
import routes from '@/routes/routes';
import { useLoginMutation } from '@/store/api';
import { ApiError } from '@/store/types';
import { IFormResponse } from '@/types/formResponse';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
      setResponse({ type: 'error', message: error.data.message });
    } else {
      dispatch(setUser(response.data.user!));
      localStorage.setItem(strings.token, response.data.user!.token);
      navigate(routes.DASHBOARD());
    }
  };

  return (
    <div className="flex flex-col flex-grow md:max-w-[400px] shadow-md px-4 py-2 rounded-md rounded-tl-none bg-main-primary">
      <Form
        inputs={inputs}
        submit={submit}
        submitLabel="Log in"
        isSubmitting={isLoading}
        response={response}
        schema={schema}
      />
    </div>
  );
};

export default Login;
