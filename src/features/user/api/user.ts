import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { IUser } from '@/features/user/types/user';



interface ILoginCredentials  {
  email: string;
  password: string; 
}

const userUrl = ({ userID, login }: {userID?: number, login?: boolean}) => {
  if (login) {
    return '/users/login';
  }

  if (userID) {
    return `/users/${userID}`;
  }

  return '/users';
};

export const userAPI = {
  useGetUser: ({ userID }: { userID: number}) =>
    useQuery({
      queryKey: ['user', userID],
      queryFn: () => axiosHelper<IUser>({method: 'get', url: userUrl({userID})}),
      enabled: !!userID,
    }),

  useLogin: () =>
    useMutation<IUser, unknown, ILoginCredentials >({
      mutationFn: (data) => axiosHelper<IUser, unknown, ILoginCredentials >({method: 'post', url: userUrl({ login: true }), data}),
    }),
};


