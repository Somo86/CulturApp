import { Route } from '../../Model/Entities/Route';
import { RouteModelType } from '../../Model/RouteModel';

export type RouteCreationModelViewType = {
  createRoute: RouteModelType['createRoute'];
  uploadFile: RouteModelType['uploadFile'];
  getDownloadURL: RouteModelType['getDownloadUrl'];
};

export const RouteCreationViewModel = (
  store: RouteModelType,
): RouteCreationModelViewType => {
  const createRoute = (id: number, route: Route) =>
    store.createRoute(id, route);

  const uploadFile = (uri: string, filename: string) =>
    store.uploadFile(uri, filename);

  const getDownloadURL = (filename: string) => store.getDownloadUrl(filename);

  return {
    createRoute,
    uploadFile,
    getDownloadURL,
  };
};
