import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { HomeProvider } from '../../src/Provider/Home';
import { HomeViewModel, HomeViewModelType } from '../../src/ViewModel/Home';
import { useHistory } from 'react-router-native';
import { Route } from '../../src/Model/Entities/Route';
import { copies } from '../../src/View/Home/components/FilterSection';

jest.mock('../../src/Model/RouteModel');
jest.mock('../../src/ViewModel/Home');
jest.mock('react-router-native');
jest.mock('../../src/utils/firebase', () => ({
  snaptshotToData: (data: any) => data,
}));

const renderView = () => {
  return render(<HomeProvider />);
};

const route = {
  id: '1',
  title: '',
  description: '',
  introduction: '',
  duration: 120,
  categoryId: 1,
  place: '',
  votes: ['1'],
  image: '',
  creatorId: '123',
  creatorName: '',
};

const routes: Array<Route & { id: string }> = [route];
const categoryRoutes: Array<Route & { id: string }> = [
  { ...route, id: '1' },
  { ...route, id: '2' },
];
const placeRoutes: Array<Route & { id: string }> = [route];
const paceAndCategoryRoutes: Array<Route & { id: string }> = [
  { ...route, id: '1' },
  { ...route, id: '2' },
  { ...route, id: '3' },
];

describe('Routes List', () => {
  const mockedPush = jest.fn();
  const mockedRoutes = (routes: Route[]) =>
    Promise.resolve(routes) as Promise<any>;

  beforeEach(() => {
    const useHistoryMock = useHistory as jest.Mock<any>;
    useHistoryMock.mockReturnValue({ push: mockedPush });
  });

  describe('api response with route list', () => {
    beforeEach(() => {
      const HomeViewModelMock = HomeViewModel as jest.Mock<HomeViewModelType>;
      HomeViewModelMock.mockReturnValue({
        getAllRoutes: () => mockedRoutes(routes),
        getRoutesByCategory: () => mockedRoutes(categoryRoutes),
        getRoutesByPlace: () => mockedRoutes(placeRoutes),
        getRoutesByCategoryAndPlace: () => mockedRoutes(paceAndCategoryRoutes),
      });
    });

    it('shows route list', async () => {
      const { getAllByTestId } = renderView();

      await waitFor(() => {
        expect(getAllByTestId('card').length).toEqual(routes.length);
      });
    });

    it('filter by category render new data', async () => {
      const { getAllByTestId, getByText } = renderView();

      // press filter to show filters
      const filterButton = getByText(copies.buttonLabel);
      fireEvent.press(filterButton);
      // press first category filter icon
      const categoryFilterButton = getAllByTestId('category_filter');
      fireEvent.press(categoryFilterButton[0]);
      await waitFor(() =>
        expect(getAllByTestId('card').length).toEqual(categoryRoutes.length),
      );
    });

    it('filter by place render new data', async () => {
      const { getAllByTestId, getByText, getByTestId } = renderView();

      // press filter to show filters
      const filterButton = getByText(copies.buttonLabel);
      fireEvent.press(filterButton);
      // press first category filter icon
      const placeFilterPicker = getByTestId('picker');

      fireEvent.press(placeFilterPicker);
      await waitFor(() => {
        const placeSelector = getByText('Anoia');
        fireEvent.press(placeSelector);
      });

      await waitFor(() => {
        expect(getAllByTestId('card').length).toEqual(placeRoutes.length);
      });
    });

    it('filter by place and category render new data', async () => {
      const { getAllByTestId, getByText, getByTestId } = renderView();

      // press filter to show filters
      const filterButton = getByText(copies.buttonLabel);
      fireEvent.press(filterButton);
      // press first category filter icon
      const placeFilterPicker = getByTestId('picker');

      fireEvent.press(placeFilterPicker);
      await waitFor(() => {
        const placeSelector = getByText('Anoia');
        fireEvent.press(placeSelector);
      });

      const categoryFilterButton = getAllByTestId('category_filter');
      fireEvent.press(categoryFilterButton[0]);

      await waitFor(() => {
        expect(getAllByTestId('card').length).toEqual(
          paceAndCategoryRoutes.length,
        );
      });
    });
  });

  describe('api response is empty', () => {
    beforeEach(() => {
      const HomeViewModelMock = HomeViewModel as jest.Mock<HomeViewModelType>;
      HomeViewModelMock.mockReturnValue({
        getAllRoutes: () => mockedRoutes([]),
        getRoutesByCategory: () => mockedRoutes(categoryRoutes),
        getRoutesByPlace: () => mockedRoutes(placeRoutes),
        getRoutesByCategoryAndPlace: () => mockedRoutes(paceAndCategoryRoutes),
      });
    });

    it('does not show any route list', async () => {
      const { queryAllByTestId } = renderView();

      await waitFor(() => {
        expect(queryAllByTestId('card').length).toBe(0);
      });
    });
  });
});
