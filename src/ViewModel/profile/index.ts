import { UserModelType } from '../../Model/UserModel';

export type profileViewModelType = {};

export const profileViewModel = (
  store: UserModelType,
): profileViewModelType => {
  const getProfile = (id: string) => store.getUser(id);

  return {
    getProfile,
  };
};
