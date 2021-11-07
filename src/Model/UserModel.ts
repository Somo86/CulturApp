import {
  createUserWithEmailAndPassword,
  createUserWithEmailAndPasswordType,
  signInWithEmailAndPassword,
  signInWithEmailAndPasswordType,
} from '../services/Authentication';
import { Database } from './Database';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { UserType } from './Entities/User';

const USERS_PATH = '/users';

type getUserType = (id: string) => FirebaseDatabaseTypes.Reference;

type addNewUserType = (user: UserType) => Promise<void>;

export type UserModelType = {
  signInOrCreate: createUserWithEmailAndPasswordType;
  signIn: signInWithEmailAndPasswordType;
  getUser: getUserType;
  addNewUser: addNewUserType;
};

export const UserModel = (): UserModelType => {
  const DB = Database();

  const signInOrCreate: createUserWithEmailAndPasswordType = (
    username,
    password,
  ) => createUserWithEmailAndPassword(username, password);

  const signIn: signInWithEmailAndPasswordType = (username, password) =>
    signInWithEmailAndPassword(username, password);

  const getUser: getUserType = id => DB.ref(`${USERS_PATH}/${id}`);

  const addNewUser: addNewUserType = ({ id, ...rest }) =>
    DB.ref(`${USERS_PATH}/${id}`).set(rest);

  return {
    signInOrCreate,
    signIn,
    getUser,
    addNewUser,
  };
};
