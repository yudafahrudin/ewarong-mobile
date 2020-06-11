import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions} from 'react-native';
import HomeScreen from './HomeStackNav';
import MenuDrawer from './MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.8,
  contentComponent: ({navigation}) => <MenuDrawer navigation={navigation} />,
};

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  DrawerConfig,
);

export default createAppContainer(DrawerNavigator);
