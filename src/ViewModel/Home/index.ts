import { RouteModelType } from '../../Model/RouteModel';

export type HomeViewModelType = {
  getAllRoutes: RouteModelType['getAllRoutes'];
};

export const HomeViewModel = (store: RouteModelType): HomeViewModelType => {
  const getAllRoutes = () => store.getAllRoutes();

  return {
    getAllRoutes,
  };
};
