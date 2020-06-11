/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import LabResultContainer from './containers/LabResultContainer';

class LabResultScreen extends Component {
  static navigationOptions = {
    title: 'Hasil Lab',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = (screen, params) => {
    this.props.navigation.navigate(screen, params);
  };

  render() {
    return <LabResultContainer navigate={this.navigateTo} />;
  }
}

export default LabResultScreen;
