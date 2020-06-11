/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import LabDetailContainer from './containers/LabDetailContainer';

class LabDetailScreen extends Component {
  static navigationOptions = {
    title: 'Detail Lab',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
  };

  navigateTo = screen => {
    this.props.navigation.navigate(screen, params);
  };

  render() {
    return (
      <LabDetailContainer
        navigate={this.navigateTo}
        noRegistration={this.props.navigation.state.params.regNo}
        noDate={this.props.navigation.state.params.regDate}
      />
    );
  }
}

export default LabDetailScreen;
