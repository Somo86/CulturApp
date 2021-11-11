import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-native';
import { Route } from '../../Model/Entities/Route';
import { Seightseeing } from '../../Model/Entities/Seightseeing';
import { documentToData, snaptshotToData } from '../../utils/firebase';
import { IntroRouteView } from '../../View/Route/introduction';
import { MapRouteView } from '../../View/Route/mapRoute';
import { RouteModelViewType } from '../../ViewModel/Route';

export const RouteViewController: React.FC<{
  viewModel: RouteModelViewType;
}> = ({ viewModel }) => {
  const { push } = useHistory();
  const { routeId } = useParams<{ routeId: string }>();
  const [route, setRoute] = useState<Route>();
  const [seightseeing, setSeightseeing] =
    useState<Array<Seightseeing & { id: string }>>();
  const [showDescription, setShowDescription] = useState(true);

  const fecthRouteById = async (routeId: string) => {
    const response = await viewModel.getRouteById(routeId);
    const data = documentToData(response) as Route | undefined;

    setRoute(data);
  };

  const fetchSeightseeingByRoute = async (routeId: string) => {
    const response = await viewModel.getSeightseeingByRoute(routeId);
    const data = snaptshotToData<Seightseeing>(response);

    setSeightseeing(data);
  };

  useEffect(() => {
    if (routeId) {
      fecthRouteById(routeId);
      fetchSeightseeingByRoute(routeId);
    }
  }, [routeId]);

  const onPressViewMap = () => setShowDescription(false);
  const onPressBackToDescription = () => setShowDescription(true);
  const onPressStart = () => push(`routes/${routeId}/details`);
  const onPressBackToHome = () => push('/home');

  return showDescription ? (
    <IntroRouteView
      route={route}
      onPressViewMap={onPressViewMap}
      onPressStart={onPressStart}
      onPressBackToHome={onPressBackToHome}
    />
  ) : (
    <MapRouteView
      title={route?.title}
      seightseeing={seightseeing}
      onPressBackToDescription={onPressBackToDescription}
    />
  );
};
