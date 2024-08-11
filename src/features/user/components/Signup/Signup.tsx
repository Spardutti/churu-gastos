import Form from '@/components/form';
import { FormInputs } from '@/components/form/types';
import { useSignupMutation } from '@/store/api';

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

const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();

  const submit = async (data: FormData) => {
    const response = await signup(data);
  };

  return (
    <div className="flex flex-grow md:max-w-[400px] shadow-md px-4 py-2 rounded-md rounded-tl-none bg-main-primary">
      <Form inputs={inputs} submit={submit} submitLabel="Log in" isSubmitting={isLoading} />
    </div>
  );
};

export default Signup;
