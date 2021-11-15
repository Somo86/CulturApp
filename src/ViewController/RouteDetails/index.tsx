import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { useHistory, useParams } from 'react-router-native';
import { Route } from '../../Model/Entities/Route';
import { Seightseeing } from '../../Model/Entities/Seightseeing';
import { requestAndroidPermission } from '../../utils/android';
import { documentToData, snaptshotToData } from '../../utils/firebase';
import {
  getCurrentLatAndLong,
  runMapsNavigation,
} from '../../utils/geolocation';
import { RouteDetailsView } from '../../View/RouteDetails';
import { RouteDetailsViewModel } from '../../ViewModel/RouteDetails';

const copies = {
  permission: {
    title: 'Localització del dispositiu',
    message:
      // eslint-disable-next-line quotes
      "Per tal d'accedir a les funcionalitats de navegació cal acceptar els permisos de localització",
    buttonPositive: 'Accepto',
    buttonNegative: 'No ho accepto',
  },
  errors: {
    // eslint-disable-next-line quotes
    openMaps: "No s'ha pogut conectar amb Google maps",
  },
};

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
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<Route>();
  const [seightseeing, setSeightseeing] = useState<
    Seightseeing & { id: string }
  >();
  // iterates each route points to show all details of each
  const [currentPoint, setCurrentPoint] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<DetailSteps>(
    DetailSteps.INTRODUCTION,
  );
  const [hasLocationPermisson, setHasLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    currentLatitude: string;
    currentLongitude: string;
  } | null>(null);

  useEffect(() => {
    // Ask permission to acces user current location
    requestAndroidPermission({
      permission: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      title: copies.permission.title,
      message: copies.permission.message,
      onGranted: () => setHasLocationPermission(true),
      buttonPositive: copies.permission.buttonPositive,
      buttonNegative: copies.permission.buttonNegative,
    });
  }, []);

  useEffect(() => {
    if (routeId) {
      fecthRouteById(routeId);
      fetchSeightseeingByRoute(routeId);
    }
  }, [routeId]);

  const getCurrentLocation = async () => {
    const response = await getCurrentLatAndLong();
    setCurrentLocation(response);
  };

  useEffect(() => {
    hasLocationPermisson && getCurrentLocation();
  }, [hasLocationPermisson]);

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
  const onInitNavigation = () => {
    try {
      currentLocation &&
        runMapsNavigation({
          source: {
            latitude: currentLocation.currentLatitude,
            longitude: currentLocation.currentLongitude,
          },
          destination: {
            latitude:
              seightseeing?.points[currentPoint].position.latitude || '0',
            longitude:
              seightseeing?.points[currentPoint].position.longitude || '0',
          },
        });
    } catch (e) {
      setError(copies.errors.openMaps);
    }
  };

  return (
    <RouteDetailsView
      route={route}
      routeDetails={seightseeing?.points[currentPoint - 1]}
      currentStep={currentStep}
      currentPoint={currentPoint}
      error={error}
      onNextStep={onNextStep}
      onFinishPoint={onFinishPoint}
      onBackHome={onBackHome}
      updateRouteVotes={updateRouteVotes}
      onInitNavigation={onInitNavigation}
      hasLocationPermisson={hasLocationPermisson}
    />
  );
};
