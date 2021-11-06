import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type createUserWithEmailAndPasswordType = (
  userName: string,
  password: string,
) => Promise<FirebaseAuthTypes.UserCredential>;

export type signInWithEmailAndPasswordType = (
  userName: string,
  password: string,
) => Promise<FirebaseAuthTypes.UserCredential>;

// Authenticate user by username and password
export const createUserWithEmailAndPassword: createUserWithEmailAndPasswordType =
  (username, password) => {
    return auth().createUserWithEmailAndPassword(username, password);
  };

export const signInWithEmailAndPassword: signInWithEmailAndPasswordType = (
  username,
  password,
) => auth().signInWithEmailAndPassword(username, password);
