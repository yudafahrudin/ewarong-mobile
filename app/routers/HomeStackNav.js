import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
// import EditAccountScreen from '../screens/EditAccountScreen';
// import AccountScreen from '../screens/AccountScreen';
// import IdCardScreen from '../screens/IdCardScreen';
// import LabResultScreen from '../screens/LabResultScreen';
// import LabDetailScreen from '../screens/LabDetailScreen';
// import HistoryBookingScreen from '../screens/HistoryBookingScreen';
// import FormBookingScreen from '../screens/FormBookingScreen';
// import HistoryNotificationSceen from '../screens/HistoryNotificationSceen';
// import HistoryNotificationDetailSceen from '../screens/HistoryNotificationDetailSceen';
// import PackageScreen from '../screens/PackageScreen';
// import PackageDetailScreen from '../screens/PackageDetailScreen';
// import PromoScreen from '../screens/PromoScreen';
// import PromoDetailScreen from '../screens/PromoDetailScreen';
// import CodebookingScreen from '../screens/CodebookingScreen';
// import FaqTermsScreen from '../screens/FaqTermsScreen';
// import HelpScreen from '../screens/HelpScreen';

import Colors from '../constants/colors';

export default createStackNavigator(
  {
    HomeScreen,
    SearchScreen,
    // EditAccountScreen,
    // AccountScreen,
    // IdCardScreen,
    // LabResultScreen,
    // HistoryBookingScreen,
    // HistoryNotificationSceen,
    // HistoryNotificationDetailSceen,
    // PromoScreen,
    // PromoDetailScreen,
    // PackageScreen,
    // CodebookingScreen,
    // HelpScreen,
    // FaqTermsScreen,
    // LabDetailScreen,
    // PackageDetailScreen,
    // FormBookingScreen,
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
