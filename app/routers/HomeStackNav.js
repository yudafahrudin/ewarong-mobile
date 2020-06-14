import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';
import AboutScreen from '../screens/AboutScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderListScreen from '../screens/OrderListScreen';
import Colors from '../constants/colors';

export default createStackNavigator(
  {
    HomeScreen,
    SearchScreen,
    FilterScreen,
    AboutScreen,
    OrderScreen,
    OrderListScreen,
  },
  {
    initialRouteName: 'HomeScreen',
    mode: 'modal',
    screenOptions: {
      gestureEnabled: true,
    },
    defaultNavigationOptions: {
      headerTintColor: Colors.BLACK,
    },
  },
);
