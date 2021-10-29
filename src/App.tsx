import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeViewController } from './ViewController/Home';

const App = () => {
  return (
    <GestureHandlerRootView>
      <NativeRouter>
        <Route exact path='/' component={HomeViewController} />
      </NativeRouter>
    </GestureHandlerRootView>
  );
};

export default App;
