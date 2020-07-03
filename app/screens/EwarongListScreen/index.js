/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import _ from 'lodash';
import EwarongListContainer from './containers/EwarongListContainer';

class EwarongListScreen extends Component {
  static navigationOptions = ({navigation}) => {
    console.log('navigation', navigation);
    return {
      title: navigation.getParam('header'),
      headerStyle: {
        backgroundColor: '#FD6A00',
      },
      headerTintColor: '#fff',
    };
  };

  navigateTo = (screen, param) => {
    this.props.navigation.navigate(screen, param);
  };

  render() {
    return <EwarongListContainer navigate={this.navigateTo} />;
  }
}

export default EwarongListScreen;
