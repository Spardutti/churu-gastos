import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { useUserContext } from '@/context/UserContext/UserContext';
import { userAPI } from '@/features/user/api/user';
import { setDefaultHeaders } from '@/lib/axios/config';
import routes from '@/routes/routes';
import { formatErrorResponse } from '@/utils/formatErrorResponse';
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
    inputType: 'text',
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

  const submit = async (formData: { email: string; password: string }) => {
    const { refresh, access } = await login(formData);
    setUser({ authorizationToken: access, refreshToken: refresh });
    localStorage.setItem('authorizationToken', access);
    setDefaultHeaders(access);
  };

  return (
    <div className="p-4">
      <Heading variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">something cool here</div>
      <Card className="max-w-[600px]" variant="info">
        <Form inputs={inputs} submit={submit} submitLabel="Log in" schema={schema} isSubmitting={isPending} />
        <p className="text-center">
          Don't have an account?{' '}
          <Link className="text-blue-500 underline" to={routes.SIGNUP()}>
            Sign up
          </Link>
        </p>
        {error && (
          <p>
            {formatErrorResponse(error)?.map((error: string) => (
              <span className="text-danger-main" key={error}>
                {error}
              </span>
            ))}
          </p>
        )}
      </Card>
    </div>
  );
};

export default Login;
