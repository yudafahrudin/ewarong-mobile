/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import HistoryBookingContainer from './containers//HistoryBookingContainer';

class HistoryBookingScreen extends Component {
  static navigationOptions = {
    title: 'Riwayat Antrian',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return <HistoryBookingContainer navigate={this.navigateTo} />;
  }
}

export default HistoryBookingScreen;
