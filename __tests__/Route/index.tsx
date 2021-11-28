import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { RouteProvider } from '../../src/Provider/Route';
import { RouteViewModel, RouteModelViewType } from '../../src/ViewModel/Route';
import { Route } from '../../src/Model/Entities/Route';
import { Points, Seightseeing } from '../../src/Model/Entities/Seightseeing';
import { useHistory, useParams } from 'react-router-native';
import { copies } from '../../src/View/Route/introduction';
import MapView from 'react-native-maps';

jest.mock('../../src/ViewModel/Route');
jest.mock('../../src/Model/SeightseeingModel');
jest.mock('../../src/Model/RouteModel');
jest.mock('react-router-native');
jest.mock('../../src/utils/firebase', () => ({
  snaptshotToData: (data: any) => data,
  documentToData: (data: any) => data,
}));
jest.mock('react-native-maps');

const renderView = () => {
  return render(<RouteProvider />);
};

const title = 'test title';
const introduction = 'test intro';
const description = 'test description';
const latitude = '12';
const longitude = '15';

const route: Route = {
  title,
  description,
  introduction,
  duration: 120,
  categoryId: 1,
  place: '',
  votes: ['1'],
  image: '',
  creatorId: '123',
  creatorName: '',
};

const points: Points[] = [
  {
    name: '',
    introduction: '',
    description: '',
    position: {
      latitude,
      longitude,
    },
  },
];

const seightseeing: Seightseeing = {
  routeId: 12,
  points: points,
};

const routeID = '12';

describe('Route', () => {
  const mockedPush = jest.fn();

  beforeEach(() => {
    const useHistoryMock = useHistory as jest.Mock<any>;
    useHistoryMock.mockReturnValue({ push: mockedPush });
    const useParamsMock = useParams as jest.Mock<any>;
    useParamsMock.mockReturnValue({ routeId: routeID });
    const RouteViewModelMock = RouteViewModel as jest.Mock<RouteModelViewType>;
    RouteViewModelMock.mockReturnValue({
      getRouteById: () => Promise.resolve(route) as Promise<any>,
      getSeightseeingByRoute: () =>
        Promise.resolve([seightseeing]) as Promise<any>,
    });
  });

  it('shows route information', async () => {
    const { getByText } = renderView();

    await waitFor(() => {
      expect(getByText(title)).toBeDefined();
      expect(getByText(introduction)).toBeDefined();
      expect(getByText(description)).toBeDefined();
    });
  });

  it('show map showing seightseeing locations', async () => {
    const { getByText } = renderView();
    await waitFor(() => getByText(title));

    fireEvent.press(getByText(copies.mapButton));
    const mockedMap = MapView as jest.Mock<any>;
    const { latitude: lat, longitude: long } =
      mockedMap.mock.calls[0][0].region;

    expect(lat).toBe(Number(latitude));
    expect(long).toBe(Number(longitude));
  });
});
