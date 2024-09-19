import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { userAPI } from '@/features/user/api/user';
import routes from '@/routes/routes';
import { formatErrorResponse } from '@/utils/formatErrorResponse';
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
    inputType: 'password',
    name: 'password',
    value: '',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  {
    inputType: 'password',
    name: 'confirm_password',
    value: '',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
  },
];

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .test('email', 'Invalid email', (value) => {
        return value?.includes('@');
      }),
    password: yup.string().required('Password is required'),
    confirm_password: yup
      .string()

      .required('Confirm Password is required'),
  })
  .required();

const Signup = () => {
  const { mutateAsync: register, isPending, error } = userAPI.useRegister();

  const submit = async (formData: { email: string; password: string }) => {
    await register({ email: formData.email, password: formData.password });
  };

  return (
    <div className="p-4">
      <Heading variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">something cool here</div>
      <Card variant="info">
        <Form inputs={inputs} submit={submit} submitLabel="Sign up" isSubmitting={isPending} schema={schema} />
        <p className="text-center">
          Already have an account?{' '}
          <Link className="text-blue-500 underline" to={routes.LOGIN()}>
            Log in
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

export default Signup;
