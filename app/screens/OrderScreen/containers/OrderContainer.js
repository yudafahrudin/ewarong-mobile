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
import {orders, getEwarong} from '../../../actions/ewarong';
import Modal from 'react-native-modal';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class OrderContainer extends Component {
  state = {
    orders: [],
    modalVisible: false,
    modalVisibleWait: false,
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

  onChangeQTY = (qty, item, satuan_number, satuan_id) => {
    const {orders} = this.state;
    let dataOrder = [];
    if (qty <= item.qty) {
      dataOrder[item.id] = {
        id: item.item_id,
        satuan_id: satuan_id,
        satuan_number: satuan_number,
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
        satuan_id: 0,
        satuan_number: 0,
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

  async orders(isok = false) {
    const {ewarong, orders} = this.state;
    const {actions, navigate} = this.props;
    this.setState({
      modalVisible: true,
    });
    this.setState({
      disabled: true,
    });

    if (isok) {
      if (orders.length == 0) {
        this.setState({
          disabled: false,
        });
        this.setState({
          modalVisible: false,
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
              modalVisibleWait: true,
            });
            await actions.getEwarong();
            navigate('HomeScreen');
          },
        );
      }
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
              <Text>{`${item.satuan_number} ${item.satuan.nama}`}</Text>
              <Text>Stock : {item.qty}</Text>
              <Text>Harga : RP. {(item.harga / 1000).toFixed(3)}</Text>
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
                onChangeText={(val) =>
                  this.onChangeQTY(
                    val,
                    item,
                    item.satuan_number,
                    item.satuan.id,
                  )
                }
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
    const {
      ewarong,
      orders,
      disabled,
      modalVisible,
      modalVisibleWait,
    } = this.state;
    console.log('orders', orders);
    console.log('ewarong', ewarong);
    return (
      <ScrollView
        style={{
          flex: 1,
          width: Dimension.DEVICE_WIDTH,
        }}>
        <Modal isVisible={modalVisible} style={{justifyContent: 'center'}}>
          <View
            style={{
              height: 150,
              width: Dimension.DEVICE_WIDTH / 1.2,
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
            }}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              Anda yakin mau melanjutkan pesanan ?
            </Text>
            <Button
              title={'LANJUTKAN'}
              onPress={() => this.orders(true)}
              buttonStyle={{
                margin: 10,
              }}
            />
            <Button
              title={'CANCEL'}
              onPress={() =>
                this.setState({modalVisible: false, disabled: false})
              }
              buttonStyle={{
                backgroundColor: Colors.RED,
                margin: 10,
                marginTop: 0,
              }}
            />
          </View>
        </Modal>

        <Modal isVisible={modalVisibleWait} style={{justifyContent: 'center'}}>
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
      </ScrollView>
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
