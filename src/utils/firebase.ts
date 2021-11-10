import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

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
