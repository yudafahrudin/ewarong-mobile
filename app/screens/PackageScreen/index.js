/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import PackageContainer from './containers/PackageContainer';

class PackageScreen extends Component {
  static navigationOptions = {
    title: 'Paket',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = (screen, param) => {
    this.props.navigation.navigate(screen, param);
  };

  render() {
    return <PackageContainer navigate={this.navigateTo} />;
  }
}

export default PackageScreen;
