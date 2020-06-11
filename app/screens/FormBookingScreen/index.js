/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import _ from 'lodash';
import FormBookingContainer from './containers/FormBookingContainer';

class FormBookingScreen extends Component {
  static navigationOptions = {
    title: 'Booking Antrian ',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const packageId = _.get(this.props.navigation.state.params, 'packageId');
    const packageTitle = _.get(
      this.props.navigation.state.params,
      'packageTitle',
    );
    const disableFeature = _.get(
      this.props.navigation.state.params,
      'disableFeature',
    );
    return (
      <FormBookingContainer
        packageId={packageId}
        packageTitle={packageTitle}
        disableFeature={disableFeature}
        navigate={this.navigateTo}
      />
    );
  }
}

export default FormBookingScreen;
