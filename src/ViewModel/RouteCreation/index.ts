import { Route } from '../../Model/Entities/Route';
import { RouteModelType } from '../../Model/RouteModel';

export type RouteCreationModelViewType = {
  createRoute: RouteModelType['createRoute'];
};

export const RouteCreationViewModel = (
  store: RouteModelType,
): RouteCreationModelViewType => {
  const createRoute = (id: number, route: Route) =>
    store.createRoute(id, route);

  return {
    createRoute,
  };
};
