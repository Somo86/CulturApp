import { Database } from './Database';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

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

  return {
    getAllRoutes,
    getRoutesByPlace,
    getRoutesByCategory,
    getRoutesByCategoryAndPlace,
    getRouteById,
  };
};
