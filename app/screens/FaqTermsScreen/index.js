/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import FaqContainer from './containers/FaqContainer';
import TermsContainer from './containers/TermsContainer';

let code = 'Terms';
class FaqTermsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    code = navigation.getParam('code', 'Terms');
    return {
      title: code !== 'Faq' ? 'Syarat Dan Ketentuan' : 'Faq',
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTintColor: '#fff',
    };
  };

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return code === 'Faq' ? (
      <FaqContainer navigate={this.navigateTo} />
    ) : (
      <TermsContainer navigate={this.navigateTo} />
    );
  }
}

export default FaqTermsScreen;
