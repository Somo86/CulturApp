import { Database } from './Database';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const SEIGHTSEEINGS_COLLECTION = 'seightseeings';

type getSeightseeingByRouteType = (
  x: string,
) => Promise<FirebaseFirestoreTypes.QuerySnapshot>;

export type SeightseeingModelType = {
  getSeightseeingByRouteId: getSeightseeingByRouteType;
};

export const SeightseeingModel = (): SeightseeingModelType => {
  const DB = Database();

  const getSeightseeingByRouteId = (routeId: string) =>
    DB.init
      .collection(SEIGHTSEEINGS_COLLECTION)
      .where('routeId', '==', parseInt(routeId))
      .get();

  return {
    getSeightseeingByRouteId,
  };
};
