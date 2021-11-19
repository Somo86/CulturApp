import { Seightseeing } from '../../Model/Entities/Seightseeing';
import { SeightseeingModelType } from '../../Model/SeightseeingModel';

export type SeightseeingsCreationViewModelType = {
  createSeightseeing: SeightseeingModelType['createSeightseeing'];
};

export const SeightseeingsCreationViewModel = (
  store: SeightseeingModelType,
): SeightseeingsCreationViewModelType => {
  const createSeightseeing = (id: string, seightseeing: Seightseeing) =>
    store.createSeightseeing(id, seightseeing);

  return {
    createSeightseeing,
  };
};
