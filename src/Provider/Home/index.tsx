import React from 'react';
import { HomeViewController } from '../../ViewController/Home';
import { HomeViewModel } from '../../ViewModel/Home';
import { RouteModel } from '../../Model/RouteModel';

export const HomeProvider = () => {
  const viewModel = HomeViewModel(RouteModel());

  return <HomeViewController viewModel={viewModel} />;
};
