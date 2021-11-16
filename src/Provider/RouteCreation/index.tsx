import React from 'react';
import { RouteModel } from '../../Model/RouteModel';
import { RouteCreationViewController } from '../../ViewController/RouteCreation';
import { RouteCreationViewModel } from '../../ViewModel/RouteCreation';

export const RouteCreationProvider = () => {
  const viewModel = RouteCreationViewModel(RouteModel());

  return <RouteCreationViewController viewModel={viewModel} />;
};
