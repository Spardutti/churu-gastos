import { IUser } from '@/features/user/types/user';
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const defaultUserContext: IUserContext = {
  user: null,
  setUser: () => {},
};

const UserContext = createContext<IUserContext>(defaultUserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
