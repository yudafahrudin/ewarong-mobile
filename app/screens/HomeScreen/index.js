/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import {Alert} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeContainer from './containers/HomeContainer';

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'E-WARONG SIDOARJO',
    headerLeft: () => (
      <Icon
        name="bars"
        size={25}
        onPress={() => navigation.toggleDrawer()}
        style={{marginLeft: 15, color: '#FFFFFF'}}
      />
    ),
    headerStyle: {
      backgroundColor: '#FD6A00',
    },
    headerTintColor: '#fff',
  });

  navigateTo = (screen, params) => {
    this.props.navigation.navigate(screen, params);
  };

  render() {
    return (
      <HomeContainer
        navigation={this.props.navigation}
        navigate={this.navigateTo}
      />
    );
  }
}

export default HomeScreen;
