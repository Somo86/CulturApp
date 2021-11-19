import React from 'react';
import { SeightseeingModel } from '../../Model/SeightseeingModel';
import { SeightseeingsCreationViewController } from '../../ViewController/SeightseeingsCreation';
import { SeightseeingsCreationViewModel } from '../../ViewModel/SeightseeingsCreation';

export const SeightseeingsCreationProvider = () => {
  const viewModel = SeightseeingsCreationViewModel(SeightseeingModel());

  return <SeightseeingsCreationViewController viewModel={viewModel} />;
};
