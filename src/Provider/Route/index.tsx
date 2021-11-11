import React from 'react';
import { RouteViewController } from '../../ViewController/Route';
import { RouteModel } from '../../Model/RouteModel';
import { RouteViewModel } from '../../ViewModel/Route';
import { SeightseeingModel } from '../../Model/SeightseeingModel';

export const RouteProvider = () => {
  const model = { ...RouteModel(), ...SeightseeingModel() };
  const viewModel = RouteViewModel(model);

  return <RouteViewController viewModel={viewModel} />;
};
