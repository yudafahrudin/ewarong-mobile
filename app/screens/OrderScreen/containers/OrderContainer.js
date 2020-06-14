/* eslint-disable import/named */
import React, {Component} from 'react';
import {View, FlatList, Alert, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListItem, Text, Input, Button} from 'react-native-elements';
import _ from 'lodash';
import {orders, getEwarong} from '../../../actions/ewarong';
import Modal from 'react-native-modal';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class OrderContainer extends Component {
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
    const {orders} = this.state;

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

  render() {
    const {navigate} = this.props;
    const {ewarong, orders, disabled, modalVisible} = this.state;
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

        {ewarong ? (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              dataOrders={orders}
              data={ewarong.stock}
              renderItem={this.renderItem}
            />
          </View>
        ) : null}
        <Button
          title={'PESAN'}
          onPress={() => this.orders()}
          disabled={disabled}
          buttonStyle={{
            width: Dimension.DEVICE_WIDTH - 20,
            margin: 10,
          }}
        />
        <Button
          title={'BATAL'}
          onPress={() => navigate('HomeScreen')}
          disabled={disabled}
          buttonStyle={{
            backgroundColor: Colors.RED,
            width: Dimension.DEVICE_WIDTH - 20,
            margin: 10,
            marginTop: 0,
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      orders,
      getEwarong,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
