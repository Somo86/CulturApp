import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

type DatabaseAttr = {
  init: FirebaseFirestoreTypes.Module;
};
type DatabaseType = () => DatabaseAttr;

export const Database: DatabaseType = () => {
  return {
    init: firestore(),
  };
};
