import React, { useEffect } from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RegisterProvider } from './Provider/Register';
import { LoginProvider } from './Provider/Login';
import { HomeProvider } from './Provider/Home';
import { RouteProvider } from './Provider/Route';
import { loadStyles } from './View/Styles/ThemeStyles';
import { RouteDetailsProvider } from './Provider/RouteDetails';

const App = () => {
  useEffect(() => {
    loadStyles();
  }, []);

  return (
    <GestureHandlerRootView>
      <NativeRouter>
        <Route exact path='/' component={LoginProvider} />
        <Route path='/register' component={RegisterProvider} />
        <Route path='/home' component={HomeProvider} />
        <Route exact path='/route/:routeId' component={RouteProvider} />
        <Route
          path='/route/:routeId/details'
          component={RouteDetailsProvider}
        />
      </NativeRouter>
    </GestureHandlerRootView>
  );
};

export default App;
