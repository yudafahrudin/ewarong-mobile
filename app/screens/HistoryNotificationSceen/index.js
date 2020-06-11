/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import HistoryNotificationContainer from './containers/HistoryNotificationContainer';

class HistoryNotificationSceen extends Component {
  static navigationOptions = {
    title: 'Notifikasi',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return <HistoryNotificationContainer navigate={this.navigateTo} />;
  }
}

export default HistoryNotificationSceen;
