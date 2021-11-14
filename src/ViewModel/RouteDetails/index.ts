import { Route } from '../../Model/Entities/Route';
import { RouteModelType } from '../../Model/RouteModel';
import { SeightseeingModelType } from '../../Model/SeightseeingModel';

export type RouteDetailsViewModel = {
  getRouteById: RouteModelType['getRouteById'];
  getSeightseeingByRoute: SeightseeingModelType['getSeightseeingByRouteId'];
  updateRoute: RouteModelType['updateRoute'];
};

export const RouteDetailsViewModel = (
  store: RouteModelType & SeightseeingModelType,
): RouteDetailsViewModel => {
  const getRouteById = (routeId: string) => store.getRouteById(routeId);

  const getSeightseeingByRoute = (routeId: string) =>
    store.getSeightseeingByRouteId(routeId);

  const updateRoute = (id: string, route: Route) =>
    store.updateRoute(id, route);

  return {
    getRouteById,
    getSeightseeingByRoute,
    updateRoute,
  };
};
