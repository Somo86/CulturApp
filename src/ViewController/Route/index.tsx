import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-native';
import { Route } from '../../Model/Entities/Route';
import { documentToData } from '../../utils/firebase';
import { IntroRouteView } from '../../View/Route/introduction';
import { MapRouteView } from '../../View/Route/mapRoute';
import { RouteModelViewType } from '../../ViewModel/Route';

export const RouteViewController: React.FC<{ viewModel: RouteModelViewType }> =
  ({ viewModel }) => {
    const { routeId } = useParams<{ routeId: string }>();
    const [route, setRoute] = useState<Route>();
    const [showDescription, setShowDescription] = useState(true);

    const fecthRouteById = async (routeId: string) => {
      const response = await viewModel.getRouteById(routeId);
      const data = documentToData(response) as Route | undefined;

      setRoute(data);
    };

    useEffect(() => {
      routeId && fecthRouteById(routeId);
    }, [routeId]);

    const onPressViewMap = () => setShowDescription(false);
    const onPressBackToDescription = () => setShowDescription(true);

    return showDescription ? (
      <IntroRouteView route={route} onPressViewMap={onPressViewMap} />
    ) : (
      <MapRouteView
        title={route?.title}
        onPressBackToDescription={onPressBackToDescription}
      />
    );
  };
