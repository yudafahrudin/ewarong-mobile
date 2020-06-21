import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import MainDrawerNav from './MainDrawerNav';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import NavigationRegisterScreen from '../screens/NavigationRegisterScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RegisterEwarongScreen from '../screens/RegisterEwarongScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Login: LoginScreen,
      Register: RegisterScreen,
      RegisterEwarong: RegisterEwarongScreen,
      NavigationRegister: NavigationRegisterScreen,
      App: MainDrawerNav,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
