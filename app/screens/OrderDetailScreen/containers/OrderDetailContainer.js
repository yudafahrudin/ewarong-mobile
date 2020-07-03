/* eslint-disable import/named */
import React, {Component} from 'react';
import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListItem, Text, Input, Button} from 'react-native-elements';
import _ from 'lodash';
import {
  orders,
  getEwarong,
  getMyOrders,
  confirmOrder,
} from '../../../actions/ewarong';
import Modal from 'react-native-modal';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class OrderDetailContainer extends Component {
  state = {
    orders: [],
    modalVisible: false,
    ewarong: null,
    disabled: false,
  };

  async componentDidMount() {
    const {ewarong} = this.props;
    this.setState({
      ewarong,
    });
  }

  keyExtractor = (item, index) => index.toString();

  onChangeQTY = (qty, item) => {
    const {orders} = this.state;
    let dataOrder = [];
    if (qty <= item.qty) {
      dataOrder[item.id] = {
        id: item.item_id,
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
        id: item.item_id,
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
    console.log(Object.values(orders));
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
    const {orders} = this.state;
    console.log(item);
    return (
      <ListItem
        title={item.item.nama}
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        subtitle={
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text>{item.item.deskripsi}</Text>
              <Text>Stock {item.qty}</Text>
              <Text>Harga {item.harga}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Input
                placeholder="qty"
                autoCapitalize="none"
                keyboardType="numeric"
                keyboardAppearance="light"
                autoFocus={false}
                autoCorrect={false}
                defaultValue={orders[item.id] ? orders[item.id]['qty'] : null}
                returnKeyType="done"
                onChangeText={(val) => this.onChangeQTY(val, item)}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={{fontSize: 17}}>
                {orders[item.id] ? orders[item.id]['harga'] : 0}
              </Text>
            </View>
          </View>
        }
        bottomDivider
        chevron
      />
    );
  };

  async confirmOrders(params) {
    const {navigate, detailOrder, actions, user} = this.props;
    await actions.confirmOrder(params);
    await actions.getMyOrders();
    navigate('OrderListScreen');
  }

  render() {
    const {navigate, detailOrder, actions, user} = this.props;
    const {ewarong, orders, disabled, modalVisible} = this.state;
    console.log(this.props);
    return (
      <ScrollView
        style={{
          flex: 1,
          width: Dimension.DEVICE_WIDTH,
        }}>
        {/* <Modal isVisible={modalVisible} style={{justifyContent: 'center'}}>
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
        </Modal> */}

        {/* {ewarong ? (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              dataOrders={orders}
              data={ewarong.stock}
              renderItem={this.renderItem}
            />
          </View>
        ) : null} */}
        <View style={{flexDirection: 'row', margin: 20}}>
          <Text style={{flex: 1}}>Nomor Pesanan </Text>
          <Text style={{}}>{detailOrder.nomor_pemesanan} </Text>
        </View>
        <View style={{flexDirection: 'row', margin: 20}}>
          <Text style={{flex: 1}}>Tanggal </Text>
          <Text style={{}}>{detailOrder.date_pemesanan} </Text>
        </View>
        <View style={{flexDirection: 'row', margin: 20}}>
          <Text style={{flex: 1}}>Kios </Text>
          <Text style={{}}>{detailOrder.ewarong.nama_kios} </Text>
        </View>
        <View style={{flexDirection: 'row', margin: 20}}>
          <Text style={{flex: 1}}>Total Qty </Text>
          <Text style={{}}>{detailOrder.qty_total} </Text>
        </View>
        <View style={{flexDirection: 'row', margin: 20}}>
          <Text style={{flex: 1}}>Harga Total</Text>
          <Text style={{}}>{detailOrder.harga_total} </Text>
        </View>
        <View style={{flexDirection: 'row', margin: 20}}>
          <Text style={{flex: 1}}>Status</Text>
          <Text style={{}}>{detailOrder.status} </Text>
        </View>
        {user.access_type == 'rpk' && detailOrder.status == 'OPEN' ? (
          <View>
            <Button
              title={'KONFIRMASI'}
              onPress={() =>
                this.confirmOrders({
                  pemesanan_id: detailOrder.id,
                  status: 'CONFIRM',
                })
              }
              disabled={disabled}
              buttonStyle={{
                width: Dimension.DEVICE_WIDTH - 20,
                margin: 10,
                marginTop: 0,
              }}
            />
            <Button
              title={'REJECT'}
              onPress={() =>
                this.confirmOrders({
                  pemesanan_id: detailOrder.id,
                  status: 'REJECTED',
                })
              }
              disabled={disabled}
              buttonStyle={{
                backgroundColor: Colors.RED,
                width: Dimension.DEVICE_WIDTH - 20,
                margin: 10,
                marginTop: 0,
              }}
            />
          </View>
        ) : null}
        <Button
          title={'KEMBALI KE HOME'}
          onPress={() => navigate('HomeScreen')}
          disabled={disabled}
          buttonStyle={{
            backgroundColor: Colors.ORANGE,
            width: Dimension.DEVICE_WIDTH - 20,
            margin: 10,
            marginTop: 0,
          }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.session.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      orders,
      getEwarong,
      getMyOrders,
      confirmOrder,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailContainer);
