import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';

type uploadFileParams = {
  uri: string;
  filename: string;
};

export const uploadFile = ({
  uri,
  filename,
}: uploadFileParams): FirebaseStorageTypes.Task => {
  return storage().ref(filename).putFile(uri);
};

export const getDownloadUrl = (filename: string): Promise<string> => {
  return storage().ref(filename).getDownloadURL();
};
