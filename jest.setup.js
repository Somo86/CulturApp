import React from 'react';
import { jest } from '@jest/globals';
import { View } from 'react-native';

const Icon = () => React.createElement(View);
Icon.getImageSource = jest.fn();
Icon.getImageSourceSync = jest.fn();

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-reanimated', () => {});
jest.mock('react-native-gesture-handler', () => {});
jest.mock('react-native-ui-lib/src/incubator/TouchableOpacity', () => {});
jest.mock('react-native-ui-lib/src/incubator/WheelPicker', () => {});
jest.mock('react-native-ui-lib/src/incubator/panView', () => {});
jest.mock('react-native-ui-lib/src/incubator/TransitionView', () => {});
jest.mock('react-native-ui-lib/src/components/tabController', () => {});
jest.mock('react-native-vector-icons/MaterialIcons', () => Icon);
jest.mock('@react-native-community/geolocation', () => {});
