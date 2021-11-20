import React from 'react';
import { ProfileView } from '../../View/profile';
import { profileViewModelType } from '../../ViewModel/profile';
import { UserContextType, useUser } from '../hooks/useUser';

type ProfileViewController = {
  viewModel?: profileViewModelType;
};

export const ProfileViewController: React.FC<ProfileViewController> = () => {
  const { email, completeName, type } = useUser() as UserContextType;

  return <ProfileView email={email} completeName={completeName} type={type} />;
};
