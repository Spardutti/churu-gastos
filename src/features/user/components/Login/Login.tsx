import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import routes from '@/routes/routes';
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
];

const schema = yup
  .object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const submit = async () => {};

  return (
    <div className="p-4">
      <Heading variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">something cool here</div>
      <Card className="max-w-[600px]" variant="info">
        <Form inputs={inputs} submit={submit} submitLabel="Log in" schema={schema} isSubmitting={false} />
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
