import { Seightseeing } from '../../Model/Entities/Seightseeing';
import { SeightseeingModelType } from '../../Model/SeightseeingModel';

export type SeightseeingsCreationViewModelType = {
  createSeightseeing: SeightseeingModelType['createSeightseeing'];
  uploadFile: SeightseeingModelType['uploadFile'];
  getDownloadURL: SeightseeingModelType['getDownloadUrl'];
};

export const SeightseeingsCreationViewModel = (
  store: SeightseeingModelType,
): SeightseeingsCreationViewModelType => {
  const createSeightseeing = (id: string, seightseeing: Seightseeing) =>
    store.createSeightseeing(id, seightseeing);

  const uploadFile = (uri: string, filename: string) =>
    store.uploadFile(uri, filename);

  const getDownloadURL = (filename: string) => store.getDownloadUrl(filename);

  return {
    createSeightseeing,
    uploadFile,
    getDownloadURL,
  };
};
