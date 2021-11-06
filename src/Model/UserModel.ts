import {
  createUserWithEmailAndPassword,
  createUserWithEmailAndPasswordType,
  signInWithEmailAndPassword,
  signInWithEmailAndPasswordType,
} from '../services/Authentication';

export type UserModelType = {
  signInOrCreate: createUserWithEmailAndPasswordType;
  signIn: signInWithEmailAndPasswordType;
};

export const UserModel = (): UserModelType => {
  const signInOrCreate: createUserWithEmailAndPasswordType = (
    username,
    password,
  ) => createUserWithEmailAndPassword(username, password);

  const signIn: signInWithEmailAndPasswordType = (username, password) =>
    signInWithEmailAndPassword(username, password);

  return {
    signInOrCreate,
    signIn,
  };
};
