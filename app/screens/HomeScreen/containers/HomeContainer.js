import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Slider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      return require('../../../assets/point_hijau.png');
    } else if (val <= 20 && val >= 11) {
      return require('../../../assets/point_orange.png');
    } else {
      return require('../../../assets/point_merah.png');
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

  navigateLogin = () => {
    const {navigate} = this.props;
    navigate('Login');
  };

  countFilterSearch(filters) {
    let total = 0;
    if (filters.searchname) {
      total = total + 1;
    }
    if (filters.usemylocation) {
      total = total + 1;
    }
    if (filters.districtfilter) {
      total = total + 1;
    }
    if (filters.villagefilter) {
      total = total + 1;
    }
    return total;
  }

  countFilter(filters) {
    let total = 0;
    if (filters.itemfilter.length > 0) {
      console.log('masuk 1');
      total = total + 1;
    }
    if (filters.timefilter) {
      console.log('masuk 2');
      total = total + 1;
    }
    if (filters.timefilterClose) {
      console.log('masuk 3');
      total = total + 1;
    }
    console.log(total);
    return total;
  }

  convertPemesanan(pemesanan) {
    const totalOpen = pemesanan.filter((val) => val.status == 'OPEN').length;
    const totalConfirm = pemesanan.filter((val) => val.status == 'CONFIRM')
      .length;
    const totalRejected = pemesanan.filter((val) => val.status == 'REJECTED')
      .length;
    const totalExpired = pemesanan.filter((val) => val.status == 'EXPIRED')
      .length;
    const totalFinish = pemesanan.filter((val) => val.status == 'FINISH')
      .length;

    return (
      <View>
        <Text>Total OPEN : {totalOpen}</Text>
        <Text>Total CONFIRM : {totalConfirm}</Text>
        <Text>Total REJECTED : {totalRejected}</Text>
        <Text>Total EXPIRED : {totalExpired}</Text>
        <Text>Total FINISH : {totalFinish}</Text>
      </View>
    );
  }

  openMAPS = (label = 'Kios', lat, lang) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lang}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  render() {
    const {ewarong, filters} = this.props;
    const {user} = this.props.session;
    const isLogin = user ? true : false;
    const {initialPosition, modalVisible, ewarongData, rangekm} = this.state;
    let nama_kios = null;
    let lokasi = null;
    let jam_buka = null;
    let jam_tutup = null;
    let telp = null;
    let pemesanan = [];
    let stock = [];
    let lat = 0;
    let lng = 0;
    if (ewarongData) {
      nama_kios = ewarongData.nama_kios;
      lokasi = ewarongData.lokasi;
      jam_buka = ewarongData.jam_buka;
      jam_tutup = ewarongData.jam_tutup;
      telp = ewarongData.telp;
      pemesanan = ewarongData.pemesanan;
      stock = ewarongData.stock;
      lat = ewarongData.latitude;
      lng = ewarongData.longitude;
    }
    const totalsearchfilter = this.countFilterSearch(filters);
    const totalFilter = this.countFilter(filters);

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
                totalsearchfilter == 0 ? (
                  <Icon
                    name="search"
                    size={18}
                    style={{marginRight: 5}}
                    color={Colors.TEXT_BLACK}
                  />
                ) : (
                  <View
                    style={{
                      marginRight: 5,
                      borderRadius: 10,
                      height: 20,
                      width: 20,
                      alignItems: 'center',
                      backgroundColor: Colors.RED,
                      fontSize: 12,
                    }}>
                    <Text style={{color: Colors.WHITE}}>
                      {totalsearchfilter}
                    </Text>
                  </View>
                )
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
                totalFilter == 0 ? (
                  <Icon
                    name="filter"
                    size={18}
                    style={{marginRight: 5}}
                    color={Colors.TEXT_BLACK}
                  />
                ) : (
                  <View
                    style={{
                      marginRight: 5,
                      borderRadius: 10,
                      height: 20,
                      width: 20,
                      alignItems: 'center',
                      backgroundColor: Colors.RED,
                      fontSize: 12,
                    }}>
                    <Text style={{color: Colors.WHITE}}>{totalFilter}</Text>
                  </View>
                )
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
                <ScrollView style={{flex: 1, marginBottom: 130}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {nama_kios}
                  </Text>
                  <Text>
                    Telp: {telp} Alamat: {lokasi}
                  </Text>
                  <Text>
                    Jam buka: {jam_buka} Jam tutup: {jam_tutup}
                  </Text>
                  <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Stock
                    </Text>
                    {stock.map((val, key) => {
                      return (
                        <View key={key} style={{marginBottom: 20}}>
                          <Text>{val.item.nama}</Text>
                          <Text>- stock : {val.qty}</Text>
                          <Text>
                            - satuan : {val.satuan_number} {val.satuan.nama}
                          </Text>
                          <Text>
                            - harga : Rp.{' '}
                            {val.harga.toString().length > 3
                              ? (val.harga / 1000).toFixed(3)
                              : val.harga}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={{marginTop: 20}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                      Riwayat Pemesanan
                    </Text>
                    {this.convertPemesanan(pemesanan)}
                  </View>
                </ScrollView>
                {isLogin ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                    }}>
                    <Button
                      title="Lihat di MAP"
                      onPress={() => this.openMAPS(nama_kios, lat, lng)}
                      titleStyle={{
                        color: Colors.TEXT_BLACK,
                      }}
                      buttonStyle={{
                        backgroundColor: Colors.LIGHT_GREY,
                        width: Dimension.DEVICE_WIDTH - 38,
                      }}
                    />
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
                ) : (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                    }}>
                    <Button
                      title="Lihat di MAP"
                      onPress={() => this.openMAPS(nama_kios, lat, lng)}
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
                      title="Pesan"
                      onPress={() => this.navigateLogin()}
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
                )}
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
              latitude: -7.417545,
              longitude: 112.492593,
              latitudeDelta: 0.002922,
              longitudeDelta: 0.002421,
            }}
            region={{
              latitude: initialPosition
                ? initialPosition.coords.latitude
                : -7.417545,
              longitude: initialPosition
                ? initialPosition.coords.longitude
                : 112.492593,
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

            {ewarong
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
                      // pinColor={this.pinnedColor(val.pemesanan.length)}
                    >
                      <Image
                        source={this.pinnedColor(val.pemesanan.length)}
                        style={{height: 60, width: 60}}
                      />
                    </Marker>
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
                maximumValue={200}
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
