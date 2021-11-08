import { Database } from './Database';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';

const ROUTES_PATH = '/routes';

type getRoutesType = () => Promise<FirebaseDatabaseTypes.DataSnapshot>;

export type RouteModelType = {
  getAllRoutes: getRoutesType;
};

export const RouteModel = (): RouteModelType => {
  const DB = Database();

  const getAllRoutes = () => DB.ref(`${ROUTES_PATH}`).once('value');

  return {
    getAllRoutes,
  };
};
