import React from 'react';
import { UserModel } from '../../Model/UserModel';
import { ProfileViewController } from '../../ViewController/profile';
import { profileViewModel } from '../../ViewModel/profile';

export const ProfileProvider = () => {
  const viewModel = profileViewModel(UserModel());

  return <ProfileViewController viewModel={viewModel} />;
};
