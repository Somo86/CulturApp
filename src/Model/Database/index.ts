import {
  firebase,
  FirebaseDatabaseTypes,
} from '@react-native-firebase/database';

const DB_URL =
  'https://culturapp-bcd1c-default-rtdb.europe-west1.firebasedatabase.app/';

type DatabaseAttr = {
  ref: (path: string) => FirebaseDatabaseTypes.Reference;
};
type DatabaseType = () => DatabaseAttr;

export const Database: DatabaseType = () => {
  // creates a database reference on the defined path
  const ref: DatabaseAttr['ref'] = reference =>
    firebase.app().database(DB_URL).ref(reference);

  return {
    ref,
  };
};
