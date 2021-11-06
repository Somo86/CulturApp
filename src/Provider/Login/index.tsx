import React from 'react';
import { LoginViewController } from '../../ViewController/Login';
import { LoginViewModel } from '../../ViewModel/Login';
import { UserModel } from '../../Model/UserModel';

export const LoginProvider = () => {
  const UserModelStore = UserModel();
  const viewModel = LoginViewModel(UserModelStore);

  return <LoginViewController viewModel={viewModel} />;
};
