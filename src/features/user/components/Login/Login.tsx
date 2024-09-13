import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { userAPI } from '@/features/user/api/user';
import routes from '@/routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

interface FormData {
  email: string;
  password: string;
}

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
  const navigate = useNavigate();


  const submit = async (data: FormData) => {};

  return (
    <div className="p-4">
      <Heading variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">something cool here</div>
      <Card className="max-w-[600px]">
        <Form inputs={inputs} submit={submit} submitLabel="Log in" schema={schema} />
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
