import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();
import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/navigations/AppNavigation';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import MapBoxGL from './src/components/Maps/MapBoxGL';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
    // <MapBoxGL />
  );
};

export default App;
