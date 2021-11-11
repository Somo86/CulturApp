import React, { useEffect } from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RegisterProvider } from './Provider/Register';
import { LoginProvider } from './Provider/Login';
import { HomeProvider } from './Provider/Home';
import { RouteProvider } from './Provider/Route';
import { loadStyles } from './View/Styles/ThemeStyles';

const App = () => {
  useEffect(() => {
    loadStyles();
  }, []);

  return (
    <GestureHandlerRootView>
      <NativeRouter>
        <Route exact path='/' component={HomeProvider} />
        <Route path='/register' component={RegisterProvider} />
        <Route path='/home' component={HomeProvider} />
        <Route path='/route/:routeId' component={RouteProvider} />
      </NativeRouter>
    </GestureHandlerRootView>
  );
};

export default App;
