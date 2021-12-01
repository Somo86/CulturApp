import { Database } from './Database';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Seightseeing } from './Entities/Seightseeing';
import {
  getDownloadUrl as getDownloadUrlService,
  uploadVideo as uploadFileService,
} from '../services/CloudStorage';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';

const SEIGHTSEEINGS_COLLECTION = 'seightseeings';

type getSeightseeingByRouteType = (
  x: string,
) => Promise<FirebaseFirestoreTypes.QuerySnapshot>;

export type SeightseeingModelType = {
  getSeightseeingByRouteId: getSeightseeingByRouteType;
  createSeightseeing: (x: string, y: Seightseeing) => Promise<void>;
  uploadFile: (x: string, y: string) => Promise<FirebaseStorageTypes.Task>;
  getDownloadUrl: (x: string) => Promise<string>;
};

export const SeightseeingModel = (): SeightseeingModelType => {
  const DB = Database();

  const getSeightseeingByRouteId = (routeId: string) =>
    DB.init
      .collection(SEIGHTSEEINGS_COLLECTION)
      .where('routeId', '==', parseInt(routeId))
      .get();

  const createSeightseeing = (id: string, seightseeing: Seightseeing) =>
    DB.init.collection(SEIGHTSEEINGS_COLLECTION).doc(id).set(seightseeing);

  const uploadFile = (uri: string, filename: string) => {
    return uploadFileService({ uri, filename });
  };

  const getDownloadUrl = (filename: string) => getDownloadUrlService(filename);

  return {
    getSeightseeingByRouteId,
    createSeightseeing,
    uploadFile,
    getDownloadUrl,
  };
};
