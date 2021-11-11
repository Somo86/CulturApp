import React from 'react';
import { RouteViewController } from '../../ViewController/Route';
import { RouteModel } from '../../Model/RouteModel';
import { RouteViewModel } from '../../ViewModel/Route';

export const RouteProvider = () => {
  const viewModel = RouteViewModel(RouteModel());

  return <RouteViewController viewModel={viewModel} />;
};
