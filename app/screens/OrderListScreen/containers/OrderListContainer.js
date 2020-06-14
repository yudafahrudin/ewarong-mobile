/* eslint-disable import/named */
import React, {Component} from 'react';
import {View, FlatList, Alert, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListItem, Text, Input, Button} from 'react-native-elements';
import _ from 'lodash';
import {orders, getEwarong, getMyOrders} from '../../../actions/ewarong';
import Modal from 'react-native-modal';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class OrderListContainer extends Component {
  state = {
    orders: [],
    modalVisible: false,
    ewarong: null,
    disabled: false,
  };

  async componentDidMount() {
    const {actions} = this.props;
    await actions.getMyOrders();
  }

  keyExtractor = (item, index) => index.toString();

  onChangeQTY = (qty, item) => {
    const {orders} = this.state;
    let dataOrder = [];
    if (qty <= item.qty) {
      dataOrder[item.id] = {
        id: item.id,
        qty,
        harga: qty * item.harga,
      };
      this.setState({
        orders: {
          ...orders,
          ...dataOrder,
        },
      });
    } else {
      dataOrder[item.id] = {
        id: item.id,
        qty: 0,
        harga: 0,
      };
      this.setState({
        orders: {
          ...orders,
          ...dataOrder,
        },
      });
      Alert.alert('Error', 'QTY melebihi stock');
    }
  };

  async orders() {
    const {ewarong, orders} = this.state;
    const {actions, navigate} = this.props;
    console.log(orders);
    this.setState({
      disabled: true,
    });
    if (orders.length == 0) {
      this.setState({
        disabled: false,
      });
      Alert.alert('Kosong', 'Anda belum memilih item');
    } else {
      await actions.orders(
        {
          ewarong_id: ewarong.id,
          items: Object.values(orders),
        },
        async () => {
          this.setState({
            modalVisible: true,
          });
          await actions.getEwarong();
          navigate('HomeScreen');
        },
      );
    }
  }

  renderItem = (props) => {
    const {item} = props;
    console.log('item', item);
    return (
      <ListItem
        title={item.ewarong.nama_kios}
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        subtitle={
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text>{item.item.nama}</Text>
              <Text>Jumlah : {item.qty}</Text>
              <Text>Harga : {item.harga}</Text>
            </View>
            <View style={{flex: 2}}>
              <Text>{item.date_pemesanan}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text>{item.status}</Text>
            </View>
          </View>
        }
        bottomDivider
        chevron
      />
    );
  };

  render() {
    const {navigate, myorders} = this.props;
    const {ewarong, orders, disabled, modalVisible} = this.state;
    // let groupdata = [];
    // if (myorders.length) {
    //   groupdata = myorders.reduce((result, currentValue) => {
    //     // If an array already present for key, push it to the array. Else create an array and push the object
    //     (result[`${currentValue.date_pemesanan}-${currentValue.ewarong_id}`] =
    //       result[`${currentValue.date_pemesanan}-${currentValue.ewarong_id}`] ||
    //       []).push({
    //       nama_kios: currentValue.ewarong.nama_kios,
    //       data: currentValue,
    //     });
    //     // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    //     return result;
    //   }, {});
    // }
    return (
      <View
        style={{
          flex: 1,
          width: Dimension.DEVICE_WIDTH,
        }}>
        <Modal isVisible={modalVisible} style={{justifyContent: 'center'}}>
          <View
            style={{
              alignSelf: 'center',
              padding: 10,
              width: 150,
              height: 80,
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
            }}>
            <ActivityIndicator size="large" color="black" />
            <Text>Tunggu sebentar</Text>
          </View>
        </Modal>

        {myorders ? (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              dataOrders={orders}
              data={Object.values(myorders)}
              renderItem={this.renderItem}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  myorders: state.ewarong.myorders,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      orders,
      getEwarong,
      getMyOrders,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderListContainer);
