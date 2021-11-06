import React from 'react';
import { Text } from 'react-native';
import { AppLayout } from '../components/Layout';

export const HomeView = () => {
  return (
    <AppLayout showActionBar>
      <Text>Home</Text>
    </AppLayout>
  );
};
