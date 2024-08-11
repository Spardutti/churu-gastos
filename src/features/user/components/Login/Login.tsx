import Form from '@/components/form';
import { FormInputs } from '@/components/form/types';
import { setUser } from '@/features/user/store/userSlice';
import { useLoginMutation } from '@/store/api';
import { useDispatch } from 'react-redux';

interface UserAuthProps {}

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

const Login = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const submit = async (data: FormData) => {
    const response = await login(data);

    if (response.data?.status === 'ok' && response.data.user) {
      dispatch(setUser(response.data.user));
    }
  };

  return (
    <div className="flex flex-grow md:max-w-[400px] shadow-md px-4 py-2 rounded-md rounded-tl-none bg-main-primary">
      <Form inputs={inputs} submit={submit} submitLabel="Log in" isSubmitting={isLoading} />
    </div>
  );
};

export default Login;
