import { UserModelType } from '../../Model/UserModel';

export type RegisterviewModelType = Pick<
  UserModelType,
  'signInOrCreate' | 'addNewUser'
>;

export const RegisterviewModel = (
  store: UserModelType,
): RegisterviewModelType => {
  const signInOrCreate: RegisterviewModelType['signInOrCreate'] = (
    username,
    password,
  ) => store.signInOrCreate(username, password);

  const addNewUser: RegisterviewModelType['addNewUser'] = user => {
    return store.addNewUser(user);
  };

  return {
    signInOrCreate,
    addNewUser,
  };
};
