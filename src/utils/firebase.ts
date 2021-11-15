import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const firebaseAuthErrorsCopies = {
  'auth/email-already-in-use': 'Aquest usuari ja te un compte',
  'auth/weak-password':
    'Contrasenya dèbil. Ha de contenir un mínim de 6 caràcters',
  'auth/user-not-found': 'Aquest usuari no existeix',
  'auth/wrong-password': 'Contrasenya incorrecte',
};

// Parses Firebase Snapshot to data to work with
export const snaptshotToData = <T = any>(
  snaptshot: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
): Array<T & { id: string }> => {
  let data: any = [];
  snaptshot.forEach(documentSnapshot => {
    data.push({ ...documentSnapshot.data(), id: documentSnapshot.id });
  });
  return data;
};

export const documentToData = (
  document: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>,
) => {
  return document.data();
};
