import Geolocation from '@react-native-community/geolocation';
import getDirections from 'react-native-google-maps-directions';

export const getCurrentLatAndLong = (): Promise<{
  currentLatitude: string;
  currentLongitude: string;
}> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      //Will give the current location
      position => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        resolve({ currentLongitude, currentLatitude });
      },
      error => {
        reject(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  });
};

type Location = {
  latitude: string;
  longitude: string;
};

type RunMapsNavigationAttr = {
  source: Location;
  destination: Location;
  travelMode?: 'walking' | 'driving' | 'bicycling' | 'transit';
};

export const runMapsNavigation = ({
  source,
  destination,
  travelMode = 'walking',
}: RunMapsNavigationAttr) => {
  const data = {
    source: {
      latitude: parseFloat(source.latitude),
      longitude: parseFloat(source.longitude),
    },
    destination: {
      latitude: parseFloat(destination.latitude),
      longitude: parseFloat(destination.longitude),
    },
    params: [
      {
        key: 'travelmode',
        value: travelMode,
      },
      {
        key: 'dir_action',
        value: 'navigate', // this instantly initializes navigation using the given travel mode
      },
    ],
  };

  getDirections(data);
};
