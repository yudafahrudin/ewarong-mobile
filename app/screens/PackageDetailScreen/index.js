/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import PackageDetailContainer from './containers/PackageDetailContainer';

class PackageDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('packageTitle', 'Package Detail'),
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  });

  navigateTo = (screen, param) => {
    this.props.navigation.navigate(screen, param);
  };

  render() {
    const {
      imageUrl,
      outletId,
      packageId,
      packageTitle,
      price,
      detail,
    } = this.props.navigation.state.params;
    return (
      <PackageDetailContainer
        imageUrl={imageUrl}
        outletId={outletId}
        packageId={packageId}
        packageTitle={packageTitle}
        price={price}
        detail={detail}
        navigate={this.navigateTo}
        {...this.props}
      />
    );
  }
}

export default PackageDetailScreen;
