import React from 'react';
import { RouteModel } from '../../Model/RouteModel';
import { SeightseeingModel } from '../../Model/SeightseeingModel';
import { RouteDetailsViewController } from '../../ViewController/RouteDetails';
import { RouteDetailsViewModel } from '../../ViewModel/RouteDetails';

export const RouteDetailsProvider = () => {
  const model = { ...RouteModel(), ...SeightseeingModel() };
  const viewModel = RouteDetailsViewModel(model);

  return <RouteDetailsViewController viewModel={viewModel} />;
};
