import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { RouteDetailsProvider } from '../../src/Provider/RouteDetails';
import {
  getCurrentLatAndLong,
  runMapsNavigation,
} from '../../src/utils/geolocation';
import { RouteDetailsViewModel } from '../../src/ViewModel/RouteDetails';
import { useHistory, useParams } from 'react-router-native';
import { requestAndroidPermission } from '../../src/utils/android';
import { copies as introductionCopies } from '../../src/View/RouteDetails/DetailsIntroduction';
import { copies as descriptionCopies } from '../../src/View/RouteDetails/DetailsDescription';
import { copies as voteCopies } from '../../src/View/RouteDetails/components/VoteDialog';
import { Points, Seightseeing } from '../../src/Model/Entities/Seightseeing';
import { Route } from '../../src/Model/Entities/Route';

jest.mock('../../src/utils/geolocation');
jest.mock('../../src/Model/RouteModel');
jest.mock('../../src/Model/SeightseeingModel');
jest.mock('../../src/ViewModel/RouteDetails');
jest.mock('react-router-native');
jest.mock('../../src/utils/android');
jest.mock('../../src/utils/firebase', () => ({
  snaptshotToData: (data: any) => data,
  documentToData: (data: any) => data,
}));

const routeId = 12;

const title = 'test title';
const introduction = 'test intro';
const description = 'test description';
const latitude = '12';
const longitude = '15';
const currentLatitude = '18';
const currentLongitude = '28';

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
    introduction,
    description,
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

const renderView = () => {
  return render(<RouteDetailsProvider />);
};

describe('Route Details', () => {
  const mockedPush = jest.fn();
  const requestAndroidPermissionMock =
    requestAndroidPermission as jest.Mock<any>;
  const updateRouteMock = jest.fn();

  beforeEach(() => {
    const useHistoryMock = useHistory as jest.Mock<any>;
    useHistoryMock.mockReturnValue({ push: mockedPush });
    const useParamsMock = useParams as jest.Mock<any>;
    useParamsMock.mockReturnValue({ routeId });
    const getCurrentLatAndLongMock = getCurrentLatAndLong as jest.Mock<
      Promise<any>
    >;
    getCurrentLatAndLongMock.mockReturnValue(
      Promise.resolve({
        currentLatitude,
        currentLongitude,
      }),
    );
    const RouteDetailsViewModelMock = RouteDetailsViewModel as jest.Mock<any>;
    RouteDetailsViewModelMock.mockReturnValue({
      getRouteById: () => Promise.resolve(route),
      getSeightseeingByRoute: () =>
        Promise.resolve([seightseeing, seightseeing]),
      updateRoute: updateRouteMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('introduction', () => {
    it('shows point introduction', async () => {
      const { getByText } = renderView();
      await waitFor(() => {
        expect(getByText(introduction)).toBeDefined();
      });
    });

    it('allows user to navigate if Android permission are granted', async () => {
      const { getByText } = renderView();
      await waitFor(() => {
        const { onGranted } = requestAndroidPermissionMock.mock.calls[0][0];
        // Permission granted
        onGranted();
      });

      expect(getByText(introductionCopies.followMeButton)).toBeDefined();
    });

    it('user is not able to navigate if Android permission are not granted', () => {
      const { queryByText } = renderView();

      expect(queryByText(introductionCopies.followMeButton)).toBeNull();
    });

    it('start navigation on point location', async () => {
      const { getByText } = renderView();
      await waitFor(() => {
        const { onGranted } = requestAndroidPermissionMock.mock.calls[0][0];
        // Permission granted
        onGranted();
      });

      fireEvent.press(getByText(introductionCopies.followMeButton));
      expect(runMapsNavigation).toHaveBeenCalledWith({
        source: {
          latitude: currentLatitude,
          longitude: currentLongitude,
        },
        destination: { latitude, longitude },
      });
    });
  });

  describe('description', () => {
    it('shows point description', async () => {
      const { getByText } = renderView();

      fireEvent.press(getByText(introductionCopies.readyButton));

      await waitFor(() => {
        expect(getByText(description)).toBeDefined();
      });
    });
  });

  describe('vote', () => {
    it('shown vote screen when all points have been seen', async () => {
      const { getByText, getByTestId } = renderView();

      fireEvent.press(getByText(introductionCopies.readyButton));
      // wait for point data to be ready
      await waitFor(() => getByText(description));

      fireEvent.press(getByText(descriptionCopies.finish));

      await waitFor(() => expect(getByTestId('vote_view')).toBeDefined());
    });

    it('votes are send to DB', async () => {
      const star_value = '2';
      const { getByText, getByTestId } = renderView();

      fireEvent.press(getByText(introductionCopies.readyButton));
      // wait for point data to be ready
      await waitFor(() => getByText(description));

      fireEvent.press(getByText(descriptionCopies.finish));

      fireEvent.press(getByTestId(`star_${star_value}`));
      fireEvent.press(getByText(voteCopies.done));

      expect(updateRouteMock).toHaveBeenCalledWith(routeId, {
        ...route,
        votes: [...route.votes, star_value],
      });
    });
  });
});
