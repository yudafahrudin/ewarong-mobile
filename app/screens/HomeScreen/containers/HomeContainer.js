import React, {Component} from 'react';
import {View, Text, Alert, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';
import {getEwarong} from '../../../actions/ewarong';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class HomeContainer extends Component {
  state = {
    modalVisible: false,
    initialPosition: null,
    ewarong_data: null,
  };

  async componentDidMount() {
    const {actions} = this.props;
    await actions.getEwarong();
    Geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position;
        this.setState({initialPosition});
      },
      (error) =>
        Alert.alert('Lokasi tidak ditemukan', 'Tolong hidupkan lokasi anda'),
      {
        enableHighAccuracy: true,
        distanceFilter: 2,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
    this.watchID = Geolocation.watchPosition((position) => {
      const lastPosition = position;
      this.setState({lastPosition});
    });
  }

  getGeoLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position;
        this.setState({initialPosition});
      },
      (error) =>
        Alert.alert('Lokasi tidak ditemukan', 'Tolong hidupkan lokasi anda'),
      {
        enableHighAccuracy: true,
        distanceFilter: 2,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
    this.watchID = Geolocation.watchPosition((position) => {
      const lastPosition = position;
      this.setState({lastPosition});
    });
  }

  pinnedColor(val) {
    console.log('total pesan', val);
    if (val <= 10) {
      return 'green';
    } else if (val <= 20 && val >= 11) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  parsingData(val) {
    return JSON.parse(val);
  }

  render() {
    const {ewarong} = this.props;
    const {initialPosition, modalVisible, ewarong_data} = this.state;
    console.log(initialPosition);
    let nama_kios = null;
    let lokasi = null;
    let jam_buka = null;
    let telp = null;
    let pemesanan = [];
    let stock = [];
    if (ewarong_data) {
      nama_kios = ewarong_data.nama_kios;
      lokasi = ewarong_data.lokasi;
      jam_buka = ewarong_data.jam_buka;
      telp = ewarong_data.telp;
      pemesanan = ewarong_data.pemesanan;
      stock = ewarong_data.stock;
    }
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: Dimension.DEVICE_WIDTH / 2 - 2}}>
            <Button
              title="Cari Kios"
              icon={
                <Icon
                  name="search"
                  size={18}
                  style={{marginRight: 5}}
                  color={Colors.TEXT_BLACK}
                />
              }
              titleStyle={{
                color: Colors.TEXT_BLACK,
              }}
              buttonStyle={{
                backgroundColor: Colors.LIGHT_GREY,
                width: Dimension.DEVICE_WIDTH / 2,
              }}
            />
          </View>
          <View style={{width: Dimension.DEVICE_WIDTH / 2 - 2}}>
            <Button
              title="Filter Kios"
              icon={
                <Icon
                  name="filter"
                  size={18}
                  style={{marginRight: 5}}
                  color={Colors.TEXT_BLACK}
                />
              }
              titleStyle={{
                color: Colors.TEXT_BLACK,
              }}
              buttonStyle={{
                backgroundColor: Colors.LIGHT_GREY,
                width: Dimension.DEVICE_WIDTH / 2,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: Dimension.DEVICE_HEIGHT,
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View>
            <Modal isVisible={modalVisible}>
              <View
                style={{
                  height: Dimension.DEVICE_HEIGHT / 2,
                  padding: 10,
                  backgroundColor: '#FFFFFF',
                }}>
                <ScrollView>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {nama_kios}
                  </Text>
                  <Text>
                    Telp: {telp} Alamat: {lokasi}
                  </Text>
                  <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Stock
                    </Text>
                    {stock.map((val, key) => {
                      return (
                        <Text key={key}>
                          {val.item.nama} - stock : {val.qty} - harga :{' '}
                          {val.harga}
                        </Text>
                      );
                    })}
                  </View>
                  <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Riwayat Pemesanan
                    </Text>
                    {pemesanan.map((val, key) => {
                      return (
                        <Text key={key}>
                          {key + 1} - {val.date_pemesanan} - {val.status}
                        </Text>
                      );
                    })}
                  </View>
                </ScrollView>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                  }}>
                  <Button
                    title="Pesan"
                    titleStyle={{
                      color: Colors.TEXT_BLACK,
                    }}
                    buttonStyle={{
                      marginBottom: 1,
                      backgroundColor: Colors.LIGHT_GREY,
                      width: Dimension.DEVICE_WIDTH - 38,
                    }}
                  />
                  <Button
                    title="Batal"
                    onPress={() => {
                      this.setState({
                        modalVisible: false,
                      });
                    }}
                    titleStyle={{
                      color: Colors.TEXT_BLACK,
                    }}
                    buttonStyle={{
                      backgroundColor: Colors.LIGHT_GREY,
                      width: Dimension.DEVICE_WIDTH - 38,
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <MapView
            style={{
              height: Dimension.DEVICE_HEIGHT,
              width: Dimension.DEVICE_WIDTH,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flex: 1,
            }}
            initialRegion={{
              latitude: -7.468489,
              longitude: 112.449825,
              latitudeDelta: 0.002922,
              longitudeDelta: 0.002421,
            }}
            region={{
              latitude: initialPosition
                ? initialPosition.coords.latitude
                : -7.468489,
              longitude: initialPosition
                ? initialPosition.coords.longitude
                : 112.449825,
              latitudeDelta: 0.002922,
              longitudeDelta: 0.002421,
            }}>
            {initialPosition ? (
              <Marker
                key={200}
                coordinate={{
                  latitude: initialPosition.coords.latitude,
                  longitude: initialPosition.coords.longitude,
                }}>
                <Icon
                  name="user-circle"
                  size={25}
                  style={{marginRight: 5}}
                  color="#3080ff"
                />
              </Marker>
            ) : null}

            {ewarong
              ? ewarong.map((val, key) => {
                  return (
                    <Marker
                      key={key}
                      onPress={() => {
                        this.setState({
                          modalVisible: true,
                          ewarong_data: val,
                        });
                      }}
                      coordinate={{
                        latitude: Number(val.latitude),
                        longitude: Number(val.longitude),
                      }}
                      pinColor={this.pinnedColor(val.pemesanan.length)}
                    />
                  );
                })
              : null}
          </MapView>
          <TouchableOpacity
            onPress={() => this.getGeoLocation()}
            style={{
              position: 'absolute', //use absolute position to show button on top of the map
              bottom: '25%', //for center align
              right: 35,
              alignSelf: 'flex-end', //for align to right
              borderWidth: 2,
              borderRadius: 28,
              borderColor: 'white',
              backgroundColor: Colors.GREEN,
            }}>
            <Icon
              name="search"
              size={20}
              style={{paddingTop: 13, padding: 15}}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  ewarong: state.ewarong.ewarong,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getEwarong,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
