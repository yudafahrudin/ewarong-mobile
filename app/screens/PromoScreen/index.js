/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import PromoContainer from './containers/PromoContainer';

class PromoScreen extends Component {
  static navigationOptions = {
    title: 'Promo',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = (screen, params) => {
    this.props.navigation.navigate(screen, params);
  };
  render() {
    return <PromoContainer navigate={this.navigateTo} />;
  }
}

export default PromoScreen;
