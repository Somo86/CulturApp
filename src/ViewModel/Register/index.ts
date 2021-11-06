import { UserModelType } from '../../Model/UserModel';

export type RegisterviewModelType = Pick<UserModelType, 'signInOrCreate'>;

export const RegisterviewModel = (
  store: UserModelType,
): RegisterviewModelType => {
  const signInOrCreate: RegisterviewModelType['signInOrCreate'] = (
    username,
    password,
  ) => store.signInOrCreate(username, password);

  return {
    signInOrCreate,
  };
};
