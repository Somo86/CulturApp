import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RegisterProvider } from './Provider/Register';
import { LoginProvider } from './Provider/Login';

const App = () => {
  return (
    <GestureHandlerRootView>
      <NativeRouter>
        <Route exact path='/' component={LoginProvider} />
        <Route path='/login' component={LoginProvider} />
        <Route path='/register' component={RegisterProvider} />
      </NativeRouter>
    </GestureHandlerRootView>
  );
};

export default App;
