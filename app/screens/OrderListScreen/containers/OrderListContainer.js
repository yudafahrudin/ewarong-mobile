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
import moment from 'moment';

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

  async componentWillUnmount() {
    const {actions} = this.props;
    await actions.getEwarong();
  }

  keyExtractor = (item, index) => index.toString();

  // onChangeQTY = (qty, item) => {
  //   const {orders} = this.state;
  //   let dataOrder = [];
  //   if (qty <= item.qty) {
  //     dataOrder[item.id] = {
  //       id: item.id,
  //       qty,
  //       harga: qty * item.harga,
  //     };
  //     this.setState({
  //       orders: {
  //         ...orders,
  //         ...dataOrder,
  //       },
  //     });
  //   } else {
  //     dataOrder[item.id] = {
  //       id: item.id,
  //       qty: 0,
  //       harga: 0,
  //     };
  //     this.setState({
  //       orders: {
  //         ...orders,
  //         ...dataOrder,
  //       },
  //     });
  //     Alert.alert('Error', 'QTY melebihi stock');
  //   }
  // };

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
    const {item, user} = props;
    console.log('item', item);
    return (
      <ListItem
        title={item.ewarong.nama_kios}
        onPress={() => this.navigateDetail(item)}
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        subtitle={
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text>Jumlah : {item.qty_total}</Text>
              <Text>Harga : RP. {(item.harga_total / 1000).toFixed(3)}</Text>
            </View>
            <View style={{flex: 2}}>
              <Text>
                {moment(item.created_at)
                  .add(7, 'hours')
                  .format('DD-MM-YYYY hh:mm:ss')}
              </Text>
            </View>
            <View style={{flex: 1}}>
              {item.status != 'REJECTED' && item.status != 'FINISH' ? (
                moment().diff(item.created_at, 'hours') - 7 > 4 ? (
                  <View>
                    <Text>EXPIRED</Text>
                  </View>
                ) : (
                  <View>
                    <Text>{item.status}</Text>
                  </View>
                )
              ) : (
                <View>
                  <Text>{item.status}</Text>
                </View>
              )}
            </View>
          </View>
        }
        bottomDivider
        chevron
      />
    );
  };

  renderItemRpk = (props) => {
    const {item} = props;
    return (
      <ListItem
        title={item.nomor_pemesanan}
        onPress={() => this.navigateDetail(item)}
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        subtitle={
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <Text>Jumlah : {item.qty_total}</Text>
              <Text>Harga : RP. {(item.harga_total / 1000).toFixed(3)}</Text>
            </View>
            <View style={{flex: 2}}>
              <Text>
                {moment(item.created_at)
                  .add(7, 'hours')
                  .format('DD-MM-YYYY hh:mm:ss')}
              </Text>
            </View>
            <View style={{flex: 1}}>
              {item.status != 'REJECTED' && item.status != 'FINISH' ? (
                moment().diff(item.created_at, 'hours') - 7 > 4 ? (
                  <View>
                    <Text>EXPIRED</Text>
                  </View>
                ) : (
                  <View>
                    <Text>{item.status}</Text>
                  </View>
                )
              ) : (
                <View>
                  <Text>{item.status}</Text>
                </View>
              )}
            </View>
          </View>
        }
        bottomDivider
        chevron
      />
    );
  };

  navigateDetail = (item) => {
    const {navigate} = this.props;
    setTimeout(() => navigate('OrderDetailScreen', {detailOrder: item}), 0);
  };

  sortByTime = (obj) => {
    obj.sort(function (a, b) {
      return moment(b.created_at) - moment(a.created_at);
    });
  };

  render() {
    const {navigate, myorders, user} = this.props;
    const {ewarong, orders, disabled, modalVisible} = this.state;

    // Sorted date manualy
    this.sortByTime(myorders);

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
            {user.access_type == 'umum' ? (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={Object.values(myorders)}
                renderItem={this.renderItem}
              />
            ) : null}
            {user.access_type == 'rpk' ? (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={Object.values(myorders)}
                renderItem={this.renderItemRpk}
              />
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  myorders: state.ewarong.myorders,
  user: state.session.user,
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
