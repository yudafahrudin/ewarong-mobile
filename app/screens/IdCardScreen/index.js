/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import IdCardContainer from './containers/IdCardContainer';

class IdCardScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return (
      <IdCardContainer
        navigation={this.props.navigation}
        navigate={this.navigateTo}
      />
    );
  }
}

export default IdCardScreen;
