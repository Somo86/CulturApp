import { Database } from './Database';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Seightseeing } from './Entities/Seightseeing';

const SEIGHTSEEINGS_COLLECTION = 'seightseeings';

type getSeightseeingByRouteType = (
  x: string,
) => Promise<FirebaseFirestoreTypes.QuerySnapshot>;

export type SeightseeingModelType = {
  getSeightseeingByRouteId: getSeightseeingByRouteType;
  createSeightseeing: (x: string, y: Seightseeing) => Promise<void>;
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

  return {
    getSeightseeingByRouteId,
    createSeightseeing,
  };
};
