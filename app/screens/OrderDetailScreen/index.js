/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import _ from 'lodash';
import OrderDetailContainer from './containers/OrderDetailContainer';

class OrderDetailScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `DETAIL PESANAN`,
    headerStyle: {
      backgroundColor: '#FD6A00',
    },
    headerTintColor: '#fff',
  });

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen);
  };

  render() {
    const detailOrder = _.get(
      this.props.navigation.state.params,
      'detailOrder',
    );

    return (
      <OrderDetailContainer
        detailOrder={detailOrder}
        navigate={this.navigateTo}
      />
    );
  }
}

export default OrderDetailScreen;
