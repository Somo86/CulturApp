import { UserModelType } from '../../Model/UserModel';

export type LoginViewModelType = Pick<
  UserModelType,
  'signIn' | 'getUserByEmail'
>;

export const LoginViewModel = (store: UserModelType): LoginViewModelType => {
  const signIn: LoginViewModelType['signIn'] = (username, password) =>
    store.signIn(username, password);

  const getUserByEmail: LoginViewModelType['getUserByEmail'] = (
    email: string,
  ) => store.getUserByEmail(email);

  return {
    signIn,
    getUserByEmail,
  };
};
