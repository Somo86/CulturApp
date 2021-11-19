import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-native';
import { Route } from '../../Model/Entities/Route';
import { snaptshotToData } from '../../utils/firebase';
import { HomeView } from '../../View/Home';
import { HomeViewModelType } from '../../ViewModel/Home';
import { UserContextType, useUser } from '../hooks/useUser';

type HomeViewControllerProps = {
  viewModel: HomeViewModelType;
};

export type SelectedCityType = {
  label: string;
  value: string;
};

export type onPressType = (x: { routeId: string }) => void;
export type onPressCategoryType = (x: number) => void;

export type RouteWithUserId = Route & { id: string };

export const HomeViewController: React.FC<HomeViewControllerProps> = ({
  viewModel,
}) => {
  const { push } = useHistory();
  const { type } = useUser() as UserContextType;
  const [routes, setRoutes] = useState<Array<Route & { id: string }> | []>([]);
  const [selectedCity, setSelectedCity] = useState<SelectedCityType>();
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoutes = async () => {
    setIsLoading(true);
    // get routes from DB and parse for view
    const response = await viewModel.getAllRoutes();
    const data = snaptshotToData<Route>(response);

    setRoutes(data);
    setIsLoading(false);
  };

  const fetchFilteredRoutes = async (filter: string) => {
    // filter routes by place
    setIsLoading(true);
    const response = await viewModel.getRoutesByPlace(filter);
    const data = snaptshotToData<Route>(response);

    setRoutes(data);
    setIsLoading(false);
  };

  const fetchFilteredByCategories = async (categoryId: number) => {
    setIsLoading(true);
    const response = await viewModel.getRoutesByCategory(categoryId);
    const data = snaptshotToData<Route>(response);

    setRoutes(data);
    setIsLoading(false);
  };

  const fetchFilteredByCategoriesAndPlace = async (
    categoryId: number,
    place: string,
  ) => {
    setIsLoading(true);
    const response = await viewModel.getRoutesByCategoryAndPlace(
      categoryId,
      place,
    );
    const data = snaptshotToData<Route>(response);

    setRoutes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    if (selectedCity && selectedCategory) {
      fetchFilteredByCategoriesAndPlace(selectedCategory, selectedCity.value);
      return;
    }
    selectedCity && fetchFilteredRoutes(selectedCity.value);
    selectedCategory && fetchFilteredByCategories(selectedCategory);
  }, [selectedCity, selectedCategory]);

  const onPressCard: onPressType = ({ routeId }) => push(`/route/${routeId}`);

  const onPressCategory: onPressCategoryType = (categoryId: number) =>
    setSelectedCategory(categoryId);

  const onChangeSelectCity = (city: SelectedCityType) => setSelectedCity(city);

  const onCreationPress = () => push('/creation');

  return (
    <HomeView
      routes={routes}
      onPressCard={onPressCard}
      onPressCategory={onPressCategory}
      onChangeSelectCity={onChangeSelectCity}
      onCreationPress={onCreationPress}
      selectedCity={selectedCity}
      userType={type}
      isLoading={isLoading}
    />
  );
};
