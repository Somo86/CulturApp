import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RegisterProvider } from './Provider/Register';
import { LoginProvider } from './Provider/Login';
import { HomeProvider } from './Provider/Home';
import { RouteProvider } from './Provider/Route';
import { loadStyles } from './View/Styles/ThemeStyles';
import { RouteDetailsProvider } from './Provider/RouteDetails';
import { RouteCreationProvider } from './Provider/RouteCreation';
import { UserProvider } from './ViewController/hooks/useUser';
import { SeightseeingsCreationProvider } from './Provider/SeightseeingsCreation';

loadStyles();

const App = () => {
  return (
    <GestureHandlerRootView>
      <UserProvider>
        <NativeRouter>
          <Route exact path='/' component={LoginProvider} />
          <Route path='/register' component={RegisterProvider} />
          <Route path='/home' component={HomeProvider} />
          <Route exact path='/route/:routeId' component={RouteProvider} />
          <Route
            path='/route/:routeId/details'
            component={RouteDetailsProvider}
          />
          <Route exact path='/creation' component={RouteCreationProvider} />
          <Route
            path='/creation/:routeId/seightseeings'
            component={SeightseeingsCreationProvider}
          />
        </NativeRouter>
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default App;
