import {
  createUserWithEmailAndPassword,
  createUserWithEmailAndPasswordType,
  signInWithEmailAndPassword,
  signInWithEmailAndPasswordType,
} from '../services/Authentication';
import { Database } from './Database';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { UserType } from './Entities/User';
import { random } from '../utils/maths';

const USERS_COLLECTION = 'users';

type getUserType = (
  id: string,
) => Promise<
  FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
>;

type addNewUserType = (user: UserType) => Promise<void>;
type getUserbyEmailType = (
  email: string,
) => Promise<
  FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
>;

export type UserModelType = {
  signInOrCreate: createUserWithEmailAndPasswordType;
  signIn: signInWithEmailAndPasswordType;
  getUser: getUserType;
  getUserByEmail: getUserbyEmailType;
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

  const getUser: getUserType = id =>
    DB.init.collection(USERS_COLLECTION).doc(id).get();

  const getUserByEmail: getUserbyEmailType = email =>
    DB.init.collection(USERS_COLLECTION).where('email', '==', email).get();

  const addNewUser: addNewUserType = user =>
    DB.init.collection(USERS_COLLECTION).doc(random().toString()).set(user);

  return {
    signInOrCreate,
    signIn,
    getUser,
    getUserByEmail,
    addNewUser,
  };
};
