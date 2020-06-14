import React, {Component} from 'react';
import {View, Text, Alert, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Slider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';
import {getEwarong, setParams} from '../../../actions/ewarong';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class HomeContainer extends Component {
  state = {
    modalVisible: false,
    initialPosition: null,
    ewarongData: null,
    rangekm: 1,
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

  async setRadius() {
    const {actions, filters} = this.props;
    const {rangekm, initialPosition} = this.state;
    if (initialPosition) {
      actions.setParams({
        ...filters,
        latitude: initialPosition.coords.latitude,
        longitude: initialPosition.coords.longitude,
        showRadius: false,
        rangekm: rangekm,
      });
      await actions.getEwarong();
    } else {
      Alert.alert('Error Lokasi', 'Tolong hidupkan lokasi anda');
    }
  }
  removeRadius() {
    const {actions, filters} = this.props;
    actions.setParams({
      ...filters,
      showRadius: false,
    });
  }

  navigateOrder = () => {
    const {ewarongData} = this.state;
    const {navigate} = this.props;
    this.setState({
      modalVisible: false,
    });
    setTimeout(() => navigate('OrderScreen', {ewarong: ewarongData}), 200);
  };

  render() {
    const {ewarong, filters} = this.props;
    const {user} = this.props.session;
    const isLogin = user ? true : false;
    const {initialPosition, modalVisible, ewarongData, rangekm} = this.state;
    console.log('ewarong', ewarong);
    let nama_kios = null;
    let lokasi = null;
    let jam_buka = null;
    let telp = null;
    let pemesanan = [];
    let stock = [];
    if (ewarongData) {
      nama_kios = ewarongData.nama_kios;
      lokasi = ewarongData.lokasi;
      jam_buka = ewarongData.jam_buka;
      telp = ewarongData.telp;
      pemesanan = ewarongData.pemesanan;
      stock = ewarongData.stock;
    }
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: Dimension.DEVICE_WIDTH / 2 - 2}}>
            <Button
              title="Cari Kios"
              onPress={() =>
                this.props.navigate('SearchScreen', initialPosition)
              }
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
              onPress={() => this.props.navigate('FilterScreen')}
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
                  height: Dimension.DEVICE_HEIGHT / 2 + 150,
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
                {isLogin ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                    }}>
                    <Button
                      title="Pesan"
                      onPress={() => this.navigateOrder()}
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
                ) : null}
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
              latitudeDelta: 0.002922 * (rangekm + 2.8),
              longitudeDelta: 0.002421 * (rangekm + 2.8),
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
                  size={30}
                  style={{
                    marginRight: 5,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 20,
                  }}
                  color="#3080ff"
                />
              </Marker>
            ) : null}

            {ewarong.length
              ? ewarong.map((val, key) => {
                  return (
                    <Marker
                      key={key}
                      onPress={() => {
                        this.setState({
                          modalVisible: true,
                          ewarongData: val,
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
          {filters.showRadius ? (
            <TouchableOpacity
              onPress={() => this.getGeoLocation()}
              style={{
                position: 'absolute', //use absolute position to show button on top of the map
                bottom: '18%', //for center align
                alignSelf: 'center', //for align to right
                borderWidth: 2,
                borderColor: 'white',
                width: Dimension.DEVICE_WIDTH - 20,
                backgroundColor: Colors.WHITE,
                padding: 10,
              }}>
              <Slider
                minimumValue={1}
                maximumValue={5}
                value={rangekm}
                onValueChange={(value) => {
                  this.setState({rangekm: Math.round(value)});
                }}
              />
              <Text style={{alignSelf: 'center', fontSize: 17}}>
                Jarak Jangkauan {rangekm} km
              </Text>
              <Button
                title={'CARI'}
                onPress={() => this.setRadius()}
                buttonStyle={{
                  margin: 10,
                }}
              />
              <Button
                title={'BATAL'}
                onPress={() => this.removeRadius()}
                buttonStyle={{
                  margin: 10,
                  marginTop: 0,
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
  ewarong: state.ewarong.ewarong,
  filters: state.ewarong.filters,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getEwarong,
      setParams,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
