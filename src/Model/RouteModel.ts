import { Database } from './Database';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Route } from './Entities/Route';
import {
  getDownloadUrl as getDownloadUrlService,
  uploadFile as uploadFileService,
} from '../services/CloudStorage';
import { FirebaseStorageTypes } from '@react-native-firebase/storage';

const ROUTES_COLLECTION = 'routes';

type getRoutesType = () => Promise<FirebaseFirestoreTypes.QuerySnapshot>;
type getRoutesFilteringType<T> = (
  filter: T,
) => Promise<FirebaseFirestoreTypes.QuerySnapshot>;

export type RouteModelType = {
  getAllRoutes: getRoutesType;
  getRoutesByPlace: getRoutesFilteringType<string>;
  getRoutesByCategory: getRoutesFilteringType<number>;
  getRoutesByCategoryAndPlace: (
    x: number,
    y: string,
  ) => Promise<FirebaseFirestoreTypes.QuerySnapshot>;
  getRouteById: (x: string) => Promise<FirebaseFirestoreTypes.DocumentSnapshot>;
  updateRoute: (x: string, y: Route) => Promise<void>;
  createRoute: (x: number, y: Route) => Promise<void>;
  uploadFile: (x: string, y: string) => FirebaseStorageTypes.Task;
  getDownloadUrl: (x: string) => Promise<string>;
};

export const RouteModel = (): RouteModelType => {
  const DB = Database();

  const getAllRoutes = () => DB.init.collection(ROUTES_COLLECTION).get();

  const getRoutesByPlace = (place: string) =>
    DB.init.collection(ROUTES_COLLECTION).where('place', '==', place).get();

  const getRoutesByCategory = (categoryId: number) =>
    DB.init
      .collection(ROUTES_COLLECTION)
      .where('categoryId', '==', categoryId)
      .get();

  const getRoutesByCategoryAndPlace = (categoryId: number, place: string) =>
    DB.init
      .collection(ROUTES_COLLECTION)
      .where('categoryId', '==', categoryId)
      .where('place', '==', place)
      .get();

  const getRouteById = (id: string) =>
    DB.init.collection(ROUTES_COLLECTION).doc(id).get();

  const updateRoute = (id: string, data: Route) =>
    DB.init
      .collection(ROUTES_COLLECTION)
      .doc(id)
      .update({
        ...data,
      });

  const createRoute = (id: number, route: Route) =>
    DB.init.collection(ROUTES_COLLECTION).doc(id.toString()).set(route);

  const uploadFile = (uri: string, filename: string) => {
    return uploadFileService({ uri, filename });
  };

  const getDownloadUrl = (filename: string) => getDownloadUrlService(filename);

  return {
    getAllRoutes,
    getRoutesByPlace,
    getRoutesByCategory,
    getRoutesByCategoryAndPlace,
    getRouteById,
    updateRoute,
    createRoute,
    uploadFile,
    getDownloadUrl,
  };
};
