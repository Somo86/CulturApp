import { UserModelType } from '../../Model/UserModel';

export type LoginViewModelType = Pick<UserModelType, 'signIn'>;

export const LoginViewModel = (store: UserModelType): LoginViewModelType => {
  const signIn: LoginViewModelType['signIn'] = (username, password) =>
    store.signIn(username, password);

  return {
    signIn,
  };
};
