import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigation from './src/navigations/AppNavigation';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import MapBoxGL from './src/components/Maps/MapBoxGL';
import SplashScreen from 'react-native-splash-screen';
import {Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    // <Provider store={store}>
    //   <SafeAreaProvider>
    //     <AppNavigation />
    //   </SafeAreaProvider>
    // </Provider>
    <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center'}}>
    <View style={{backgroundColor:'white',flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontFamily: 'Inter-Regular', fontSize: 20,margin:10}}>
        Abhishek Badugu (Regular)
      </Text>
      <Text style={{fontFamily: 'Inter-Bold', fontSize: 20,margin:20}}>
        Abhishek Badugu (Bold)
      </Text>
      <Text style={{fontFamily: 'Inter-ExtraBold', fontSize: 20,margin:20}}>
        Abhishek Badugu (ExtraBold)
      </Text>
      <Text style={{fontFamily: 'Inter-Light', fontSize: 20,margin:20}}>
        Abhishek Badugu (Light)
      </Text>
      <Text style={{fontFamily: 'Inter-Black', fontSize: 20,margin:20}}>
        Abhishek Badugu (Black)
      </Text>
      <Text style={{fontFamily: 'Inter-ExtraLight', fontSize: 20,margin:20}}>
        Abhishek Badugu (ExtraLight)
      </Text>
      <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 20,margin:20}}>
        Abhishek Badugu (SemiBold)
      </Text>
      <Text style={{fontFamily: 'Inter-Thin', fontSize: 20,margin:20}}>
        Abhishek Badugu (Thin)
      </Text>
      <Text style={{fontFamily: 'Inter-Medium', fontSize: 20,margin:20}}>
        Abhishek Badugu (Medium)
      </Text>
      <Text style={{fontSize: 20}}>
        Abhishek Badugu (By Default)
      </Text>
    </View>
    </ScrollView>
    // <MapBoxGL />
  );
};

export default App;
