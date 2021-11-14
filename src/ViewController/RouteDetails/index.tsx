import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-native';
import { Route } from '../../Model/Entities/Route';
import { Seightseeing } from '../../Model/Entities/Seightseeing';
import { documentToData, snaptshotToData } from '../../utils/firebase';
import { RouteDetailsView } from '../../View/RouteDetails';
import { RouteDetailsViewModel } from '../../ViewModel/RouteDetails';

export enum DetailSteps {
  INTRODUCTION,
  DESCRIPTION,
  VOTE,
}

export const RouteDetailsViewController: React.FC<{
  viewModel: RouteDetailsViewModel;
}> = ({ viewModel }) => {
  const { routeId } = useParams<{ routeId: string }>();
  const { push } = useHistory();
  const [route, setRoute] = useState<Route>();
  const [seightseeing, setSeightseeing] = useState<
    Seightseeing & { id: string }
  >();
  // iterates each route points to show all details of each
  const [currentPoint, setCurrentPoint] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<DetailSteps>(
    DetailSteps.INTRODUCTION,
  );

  useEffect(() => {
    if (routeId) {
      fecthRouteById(routeId);
      fetchSeightseeingByRoute(routeId);
    }
  }, [routeId]);

  const fecthRouteById = async (routeId: string) => {
    const response = await viewModel.getRouteById(routeId);
    const data = documentToData(response) as Route | undefined;

    setRoute(data);
  };

  const fetchSeightseeingByRoute = async (routeId: string) => {
    const response = await viewModel.getSeightseeingByRoute(routeId);
    const data = snaptshotToData<Seightseeing>(response);

    setSeightseeing(data[0]);
  };

  const updateRouteVotes = async (vote: number) => {
    if (route) {
      const updatedRoute: Route = {
        ...route,
        votes: [...route.votes, vote.toString()] || [...route.votes, '0'],
      };
      await viewModel.updateRoute(routeId, updatedRoute);
      push('/home');
    }
  };

  const onNextStep = () =>
    setCurrentStep(
      currentStep === DetailSteps.INTRODUCTION
        ? DetailSteps.DESCRIPTION
        : DetailSteps.INTRODUCTION,
    );

  const onFinishPoint = () => {
    const nextPoint = currentPoint + 1;
    setCurrentStep(
      seightseeing?.points && nextPoint > seightseeing.points.length
        ? DetailSteps.VOTE
        : DetailSteps.INTRODUCTION,
    );
    setCurrentPoint(nextPoint);
  };

  const onBackHome = () => push('/home');

  return (
    <RouteDetailsView
      route={route}
      routeDetails={seightseeing?.points[currentPoint - 1]}
      currentStep={currentStep}
      currentPoint={currentPoint}
      onNextStep={onNextStep}
      onFinishPoint={onFinishPoint}
      onBackHome={onBackHome}
      updateRouteVotes={updateRouteVotes}
    />
  );
};
