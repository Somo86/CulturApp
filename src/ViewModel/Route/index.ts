import { RouteModelType } from '../../Model/RouteModel';

export type RouteModelViewType = {
  getRouteById: RouteModelType['getRouteById'];
};

export const RouteViewModel = (store: RouteModelType): RouteModelViewType => {
  const getRouteById = (routeId: string) => store.getRouteById(routeId);

  return {
    getRouteById,
  };
};
