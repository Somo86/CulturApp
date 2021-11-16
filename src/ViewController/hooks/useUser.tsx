import React, { useState, useContext, createContext } from 'react';
type LoggedUserType = {
  completeName?: string;
  email?: string;
  type?: number;
  id?: string;
};

export type UserContextType = LoggedUserType & {
  setLoggedUser: any;
};

export const UserContext = createContext<UserContextType | {}>({});

export const UserProvider: React.FC<{}> = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUserType | {}>({});

  return (
    <UserContext.Provider value={{ ...loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType | {} => {
  return useContext(UserContext);
};
