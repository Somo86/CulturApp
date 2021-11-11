import { RouteModelType } from '../../Model/RouteModel';
import { SeightseeingModelType } from '../../Model/SeightseeingModel';

export type RouteModelViewType = {
  getRouteById: RouteModelType['getRouteById'];
  getSeightseeingByRoute: SeightseeingModelType['getSeightseeingByRouteId'];
};

export const RouteViewModel = (
  store: RouteModelType & SeightseeingModelType,
): RouteModelViewType => {
  const getRouteById = (routeId: string) => store.getRouteById(routeId);

  const getSeightseeingByRoute = (routeId: string) =>
    store.getSeightseeingByRouteId(routeId);

  return {
    getRouteById,
    getSeightseeingByRoute,
  };
};
