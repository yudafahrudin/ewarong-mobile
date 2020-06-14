/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import _ from 'lodash';
import OrderContainer from './containers/OrderContainer';

class OrderScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Kios ${navigation.state.params.ewarong.nama_kios}`,
    headerStyle: {
      backgroundColor: '#FD6A00',
    },
    headerTintColor: '#fff',
  });

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const ewarong = _.get(this.props.navigation.state.params, 'ewarong');
    return <OrderContainer ewarong={ewarong} navigate={this.navigateTo} />;
  }
}

export default OrderScreen;
