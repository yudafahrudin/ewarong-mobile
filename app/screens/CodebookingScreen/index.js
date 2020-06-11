/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CodebookingContainer from './containers/CodebookingContainer';

class CodebookingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Kode Booking',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    headerLeft: (
      <TouchableOpacity style={{ marginLeft: 15 }}>
        <Icon
          name={'arrow-back'}
          size={25}
          color="white"
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
        />
      </TouchableOpacity>
    ),
  });

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return <CodebookingContainer navigate={this.navigateTo} />;
  }
}

export default CodebookingScreen;
