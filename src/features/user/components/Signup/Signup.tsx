import Card from '@/components/card';
import ErrorMessage from '@/components/ErrorMessage';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { userAPI } from '@/features/user/api/user';
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

  const submit = async (formData: { email: string; password: string; language: string }) => {
    const language = window.navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await register({ email: formData.email, password: formData.password, language, timezone });
  };

  return (
    <div className="p-4">
      <Heading color="default" variant="h1" label="Churu Gastos" />
      <div className="h-24 flex items-center justify-center">
        <Heading color="default" label="Create your account" variant="h3" />
      </div>
      <Card className="max-w-[600px] mx-auto">
        <Form
          inputs={inputs}
          submit={submit}
          submitLabel="Sign up"
          isSubmitting={isPending}
          schema={schema}
          className="flex-col"
        />
        <p className="text-center">
          Already have an account?{' '}
          <Link className="text-main-primary-text underline" to={routes.LOGIN()}>
            Log in
          </Link>
        </p>
        <ErrorMessage error={error} />
      </Card>
    </div>
  );
};

export default Signup;
