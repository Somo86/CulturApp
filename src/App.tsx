import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RegisterProvider } from './Provider/Register';
import { LoginProvider } from './Provider/Login';
import { HomeProvider } from './Provider/Home';

const App = () => {
  return (
    <GestureHandlerRootView>
      <NativeRouter>
        <Route exact path='/' component={LoginProvider} />
        <Route path='/register' component={RegisterProvider} />
        <Route path='/home' component={HomeProvider} />
      </NativeRouter>
    </GestureHandlerRootView>
  );
};

export default App;
