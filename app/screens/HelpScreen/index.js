/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import HelpContainer from './containers/HelpContainer';

class HelpScreen extends Component {
  static navigationOptions = {
    title: 'Bantuan',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = (screen, param) => {
    this.props.navigation.navigate(screen, param);
  };

  render() {
    return <HelpContainer navigate={this.navigateTo} />;
  }
}

export default HelpScreen;
