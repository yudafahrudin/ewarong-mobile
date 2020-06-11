/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import PromoDetailContainer from './containers/PromoDetailContainer';

class PromoDetailScreen extends Component {
  static navigationOptions = () => ({
    title: 'Promo Detail',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  });

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const { getParam } = this.props.navigation;
    return (
      <PromoDetailContainer
        navigate={this.navigateTo}
        title={getParam('promoTitle', 'Promo Detail')}
        imageUrl={getParam('imageUrl', '')}
        content={getParam('content', 'No content')}
        {...this.props}
      />
    );
  }
}

export default PromoDetailScreen;
