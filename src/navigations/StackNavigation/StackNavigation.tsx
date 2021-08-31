import React from 'react';
import Details from '../../screens/DetailScreen/Details';
import Home from '../../screens/HomeScreen/Home';
import Lists from '../../screens/ListsScreen/Lists';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {TransitionPresets} from '@react-navigation/stack';
import { connect } from 'react-redux';
import Settings from '../../screens/Settings/Settings';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

const StackNav = createSharedElementStackNavigator();

const StackNavigation = (props:any) => {

  const {theme} = props;
  
  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <StackNav.Navigator
      mode={'modal'}
      screenOptions={{
        headerStyle: {
          borderBottomColor: 'white',
          elevation: 0,
          shadowRadius: 0,
          shadowOffset: {height: 0, width: 0},
          backgroundColor:theme.PRIMARY_BACKGROUND_COLOR
        },
        headerTintColor:theme.PRIMARY_TEXT_COLOR,
      }}>
      <StackNav.Screen name={'Home'} component={Home} />
      <StackNav.Screen name={'Lists'} component={Lists} />
      <StackNav.Screen
        name={'Details'}
        component={Details}
        // options={{...TransitionPresets.SlideFromRightIOS}}
      />
      <StackNav.Screen
        name={'Settings'}
        component={Settings}
        // options={{...TransitionPresets.SlideFromRightIOS}}
      />
    </StackNav.Navigator>
  );
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.AuthUser?.theme,
  };
};

export default connect(mapStateToProps)(StackNavigation);
