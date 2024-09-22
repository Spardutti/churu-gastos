import Card from '@/components/card';
import ErrorMessage from '@/components/ErrorMessage';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { useUserContext } from '@/context/UserContext/UserContext';
import { userAPI } from '@/features/user/api/user';
import { setDefaultHeaders } from '@/lib/axios/config';
import routes from '@/routes/routes';
import { Link, useNavigate } from 'react-router-dom';
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
    inputType: 'password',
    name: 'password',
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
  const { mutateAsync: login, isPending, error } = userAPI.useLogin();
  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const submit = async (formData: { email: string; password: string }) => {
    const { refresh, access, timezone, id, email } = await login(formData);
    setUser({ authorizationToken: access, refreshToken: refresh, timezone, id, email });
    localStorage.setItem('authorizationToken', access);
    setDefaultHeaders(access);

    navigate(routes.DASHBOARD());
  };

  return (
    <div className="p-4">
      <Heading variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">
        <Heading label="Welcome Back" variant="h3" />
      </div>
      <Card className="max-w-[600px] mx-auto">
        <Form
          inputs={inputs}
          submit={submit}
          submitLabel="Log in"
          schema={schema}
          isSubmitting={isPending}
          className="flex-col"
        />
        <p className="text-center">
          Don&apos;t have an account?{' '}
          <Link className="text-main-primary-text underline" to={routes.SIGNUP()}>
            Sign up
          </Link>
        </p>
        <ErrorMessage error={error} />
      </Card>
    </div>
  );
};

export default Login;
