import { RouteModelType } from '../../Model/RouteModel';

export type HomeViewModelType = {
  getAllRoutes: RouteModelType['getAllRoutes'];
  getRoutesByPlace: RouteModelType['getRoutesByPlace'];
  getRoutesByCategory: RouteModelType['getRoutesByCategory'];
  getRoutesByCategoryAndPlace: RouteModelType['getRoutesByCategoryAndPlace'];
};

export const HomeViewModel = (store: RouteModelType): HomeViewModelType => {
  const getAllRoutes = () => store.getAllRoutes();
  const getRoutesByPlace = (place: string) => store.getRoutesByPlace(place);
  const getRoutesByCategory = (category: number) =>
    store.getRoutesByCategory(category);
  const getRoutesByCategoryAndPlace = (category: number, place: string) =>
    store.getRoutesByCategoryAndPlace(category, place);

  return {
    getAllRoutes,
    getRoutesByPlace,
    getRoutesByCategory,
    getRoutesByCategoryAndPlace,
  };
};
