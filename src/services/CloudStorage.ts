import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';

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

export const uploadVideo = async ({
  uri,
  filename,
}: uploadFileParams): Promise<FirebaseStorageTypes.Task> => {
  const data = await RNFS.readFile(uri, 'base64');
  return storage().ref(filename).putString(data, 'base64');
};

export const getDownloadUrl = (filename: string): Promise<string> => {
  return storage().ref(filename).getDownloadURL();
};
