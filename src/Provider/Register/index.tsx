import React from 'react';
import { RegisterViewController } from '../../ViewController/Register';
import { RegisterviewModel } from '../../ViewModel/Register';
import { UserModel } from '../../Model/UserModel';

export const RegisterProvider = () => {
  const UserModelStore = UserModel();
  const viewModel = RegisterviewModel(UserModelStore);

  return <RegisterViewController viewModel={viewModel} />;
};
