import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigation from '../StackNavigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import Drawer from '../../screens/Drawer/Drawer';
import {StatusBar} from 'react-native';
import { connect } from 'react-redux';

const DrawerNav = createDrawerNavigator();

const DrawerNavigation = (props:any) => {
  const {theme} = props;
  return (
    <>
      <StatusBar translucent backgroundColor={'#00000021'} barStyle={theme.mode=='dark'? 'light-content' :'dark-content'} />
      <NavigationContainer>
        <DrawerNav.Navigator drawerContent={props => <Drawer {...props} />}>
          <DrawerNav.Screen name={'HomeScreen'} component={StackNavigation} />
        </DrawerNav.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    theme: state.AuthUser?.theme,
  };
};

export default connect(mapStateToProps)(DrawerNavigation);


