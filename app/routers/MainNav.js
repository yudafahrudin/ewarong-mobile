import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import MainDrawerNav from './MainDrawerNav';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Login: LoginScreen,
      Register: RegisterScreen,
      App: MainDrawerNav,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
