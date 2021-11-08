import React, { useEffect, useState } from 'react';
import { Route } from '../../Model/Entities/Route';
import { HomeView } from '../../View/Home';
import { HomeViewModelType } from '../../ViewModel/Home';

type HomeViewControllerProps = {
  viewModel: HomeViewModelType;
};

export type onPressType = (
  x: Pick<RouteWithUserId, 'userId' | 'routeId'>,
) => void;

export type RouteWithUserId = Route & { userId: string; routeId: string };

export const HomeViewController: React.FC<HomeViewControllerProps> = ({
  viewModel,
}) => {
  const [routes, setRoutes] = useState<RouteWithUserId[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>();

  const fetchRoutes = async () => {
    // get routes from DB and parse for view
    const snaptshot = await viewModel.getAllRoutes();
    const responseVal = snaptshot.val();
    const parsedRoutes: RouteWithUserId[] = Object.keys(responseVal)
      .map(userId =>
        Object.keys(responseVal[userId]).map(routeId => ({
          ...responseVal[userId][routeId],
          userId,
          routeId,
        })),
      )
      .flat();
    setRoutes(parsedRoutes);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {}, [selectedCity]);

  const onPressCard: onPressType = ({ userId, routeId }) => {
    console.log(userId);
  };

  const onChangeSelectCity = (city: string) => setSelectedCity(city);

  return (
    <HomeView
      routes={routes}
      onPressCard={onPressCard}
      onChangeSelectCity={onChangeSelectCity}
      selectedCity={selectedCity}
    />
  );
};
