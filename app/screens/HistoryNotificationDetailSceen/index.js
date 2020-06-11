/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import HistoryNotificationDetailContainer from './containers/HistoryNotificationDetailContainer';

class HistoryNotificationDetailSceen extends Component {
  static navigationOptions = {
    title: 'Pemberitahuan Hasil LAB',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return <HistoryNotificationDetailContainer navigate={this.navigateTo} />;
  }
}

export default HistoryNotificationDetailSceen;
