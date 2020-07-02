/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import _ from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  StyleSheet,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, Input, Text} from 'react-native-elements';
import {TabView, SceneMap} from 'react-native-tab-view';
import Geolocation from '@react-native-community/geolocation';
// ACTION
import {
  getAllDistricts,
  getAllVillages,
  setDistrictId,
} from '../../actions/ewarong';
import {register} from '../../actions/session';
// COMPONENT
import Icon from 'react-native-vector-icons/FontAwesome';
// CONSTANTS
import Colors from '../../constants/colors';
import Dimension from '../../constants/dimensions';
import NavigationProps from '../../constants/propTypes/navigation';

class RegisterEwarongScreen extends Component {
  _isMounted = false;
  state = {
    name: null,
    address: null,
    index: 0,
    type: 'rpk',
    lokasi: '',
    password: null,
    password_conf: null,
    email: null,
    disabled: false,
    nama_kios: null,
    latitude: '',
    longitude: '',
    showDate: false,
    timeShow: null,
    telp: null,
    district_id: -1,
    edistrict_id: -1,
    village_id: -1,
    evillage_id: -1,
    districts: [],
    edistricts: [],
    villages: [],
    evillages: [],
    villagesUses: [],
    evillagesUses: [],
  };

  async componentDidMount() {
    this._isMounted = true;
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );

    const {actions} = this.props;
    await actions.getAllDistricts().then(() => {
      const {alldistricts} = this.props;
      const districts = Object.values(alldistricts.districts);
      const edistricts = Object.values(alldistricts.districts);
      const villages = Object.values(alldistricts.villages);
      const evillages = Object.values(alldistricts.villages);
      this.setState({
        districts,
        edistricts,
        villages,
        evillages,
        villagesUses: villages,
        evillagesUses: evillages,
      });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.backHandler.remove();
  }

  onBackButtonPressAndroid = () => {
    const {navigation} = this.props;
    navigation.navigate('Login');
    return true;
  };

  onRegister = async () => {
    const {actions, navigation} = this.props;
    const {
      name,
      type,
      address,
      password,
      password_conf,
      email,
      nama_kios,
      latitude,
      longitude,
      timeShow,
      lokasi,
      edistrict_id,
      district_id,
      evillage_id,
      village_id,
      telp,
    } = this.state;
    if (name && password && password_conf && email && type == 'umum') {
      if (password !== password_conf) {
        Alert.alert('Error', 'Password dan konfirmasi password tidak sama');
        return null;
      }
      this.setState({
        disabled: true,
      });
      await actions.register(
        {
          name,
          type,
          password,
          email,
          address,
        },
        () => navigation.navigate('Login'),
      );
      this.setState({
        disabled: false,
      });
    } else if (
      name &&
      password &&
      password_conf &&
      email &&
      nama_kios &&
      telp &&
      latitude &&
      longitude &&
      lokasi &&
      edistrict_id &&
      district_id &&
      evillage_id &&
      village_id &&
      timeShow &&
      type == 'rpk'
    ) {
      if (password !== password_conf) {
        Alert.alert('Error', 'Password dan konfirmasi password tidak sama');
        return null;
      }
      this.setState({
        disabled: true,
      });
      console.log('create user + rpk', {
        name,
        type,
        address,
        password,
        password_conf,
        email,
        nama_kios,
        latitude,
        longitude,
        timeShow,
        lokasi,
        edistrict_id,
        district_id,
        evillage_id,
        village_id,
        telp,
      });
      await actions.register(
        {
          name,
          type,
          password,
          email,
          address,
          nama_kios,
          telp,
          latitude,
          longitude,
          jam_buka: timeShow,
          lokasi,
          edistrict_id,
          district_id,
          evillage_id,
          village_id,
        },
        () => navigation.navigate('Login'),
      );
      this.setState({
        disabled: false,
      });
    } else {
      Alert.alert('Error', 'Mohon untuk mengisi semua data');
    }
  };

  onChangeName = (name) => {
    this.setState({
      name,
    });
  };
  onChangeAddress = (address) => {
    this.setState({
      address,
    });
  };

  onChangePassword = (password) => {
    this.setState({
      password,
    });
  };

  onConfirmPassword = (password_conf) => {
    this.setState({
      password_conf,
    });
  };

  onNamceKiosChange = (nama_kios) => {
    this.setState({
      nama_kios,
    });
  };

  onNotelp = (telp) => {
    this.setState({
      telp,
    });
  };

  onLatitude = (latitude) => {
    this.setState({
      latitude,
    });
  };

  onLongitude = (longitude) => {
    this.setState({
      longitude,
    });
  };

  onLocation = (lokasi) => {
    this.setState({
      lokasi,
    });
  };

  onChangeMail = (email) => {
    this.setState({
      email,
    });
  };

  async getGeoLocation() {
    this.setState({
      disabled: true,
    });
    await Geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position;
        console.log(initialPosition);
        this.setState({
          latitude: initialPosition.coords.latitude,
          longitude: initialPosition.coords.longitude,
          disabled: false,
        });
      },
      () => {
        Alert.alert('Lokasi tidak ditemukan', 'Tolong hidupkan lokasi anda');
        this.setState({
          disabled: false,
        });
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 2,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  showTimepicker() {
    const {showDate} = this.state;
    this.setState({
      showDate: !showDate,
    });
  }

  onChangeTime(value) {
    const {showDate} = this.state;
    if (value.type == 'set') {
      this.setState({
        timeShow: moment(value.nativeEvent.timestamp).format('HH:mm'),
        showDate: !showDate,
      });
    }
    this.setState({
      showDate: !showDate,
    });
  }

  setSelectedValueDistricts = (itemValue) => {
    const villages = this.state.villages.filter((val) => {
      if (Number(val.district_id) == Number(itemValue)) {
        return val;
      }
    });
    if (villages.length > 0) {
      this.setState({district_id: itemValue, villagesUses: villages});
    }
  };

  setSelectedValueVillages = (itemValue) => {
    this.setState({village_id: itemValue});
  };

  esetSelectedValueDistricts = (itemValue) => {
    const villages = this.state.villages.filter((val) => {
      if (Number(val.district_id) == Number(itemValue)) {
        return val;
      }
    });
    if (villages.length > 0) {
      this.setState({edistrict_id: itemValue, evillagesUses: villages});
    }
  };

  esetSelectedValueVillages = (itemValue) => {
    this.setState({evillage_id: itemValue});
  };

  render() {
    const {
      disabled,
      latitude,
      longitude,
      timeShow,
      showDate,
      district_id,
      edistrict_id,
      village_id,
      evillage_id,
      districts,
      edistricts,
      villagesUses,
      evillagesUses,
    } = this.state;

    const district_conv = districts ? districts : [];
    const edistrict_conv = edistricts ? edistricts : [];
    const village_conv = villagesUses ? villagesUses : [];
    const evillage_conv = evillagesUses ? evillagesUses : [];

    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <StatusBar backgroundColor={Colors.BLACK} />

        <ScrollView style={{paddingTop: 50, marginBottom: 10, flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              marginBottom: '30%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <Icon name="home" size={28} color={Colors.DARK_GREY} />
              <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 15}}>
                FORM PENDAFTARAN EWARONG
              </Text>
            </View>
            <View style={{width: Dimension.DEVICE_WIDTH - 50}}>
              <Input
                placeholder="Nama"
                autoCapitalize="none"
                keyboardAppearance="light"
                autoFocus={false}
                autoCorrect={false}
                returnKeyType="next"
                onChangeText={(val) => this.onChangeName(val)}
                onSubmitEditing={() => {
                  this.emailInput.focus();
                }}
              />
              <Input
                placeholder="Email"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                keyboardAppearance="light"
                returnKeyType="next"
                onChangeText={this.onChangeMail}
                ref={(input) => {
                  this.emailInput = input;
                }}
                onSubmitEditing={() => {
                  this.addressInput.focus();
                }}
              />
              <Input
                placeholder="Alamat"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                keyboardAppearance="light"
                returnKeyType="next"
                onChangeText={this.onChangeAddress}
                ref={(input) => {
                  this.addressInput = input;
                }}
                onSubmitEditing={() => {
                  this.passwordInput.focus();
                }}
              />
              {district_conv.length > 0 ? (
                <Picker
                  selectedValue={district_id}
                  onValueChange={this.setSelectedValueDistricts}>
                  <Picker.Item key={-1} label={'Pilih Kecamatan'} value={-1} />
                  {district_conv.map((val, key) => {
                    return (
                      <Picker.Item key={key} label={val.name} value={val.id} />
                    );
                  })}
                </Picker>
              ) : null}
              {village_conv.length > 0 ? (
                <Picker
                  selectedValue={village_id}
                  enabled={village_conv.length === 0 ? false : true}
                  onValueChange={this.setSelectedValueVillages}>
                  <Picker.Item key={-1} label={'Pilih Desa'} value={-1} />
                  {village_conv.map((val, key) => {
                    return (
                      <Picker.Item key={key} label={val.name} value={val.id} />
                    );
                  })}
                </Picker>
              ) : null}
              <Input
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                keyboardAppearance="light"
                blurOnSubmit
                secureTextEntry
                ref={(input) => {
                  this.passwordInput = input;
                }}
                onSubmitEditing={() => {
                  this.confPasswordInput.focus();
                }}
                onChangeText={this.onChangePassword}
              />
              <Input
                placeholder="Konfirmasi Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                keyboardAppearance="light"
                blurOnSubmit
                secureTextEntry
                ref={(input) => {
                  this.confPasswordInput = input;
                }}
                onChangeText={this.onConfirmPassword}
              />
            </View>
            <Text style={{fontSize: 18}}> Informasi Kios </Text>
            <View style={{width: Dimension.DEVICE_WIDTH - 50}}>
              <Input
                placeholder="Nama Kios"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                keyboardAppearance="light"
                returnKeyType="next"
                onChangeText={this.onNamceKiosChange}
                ref={(input) => {
                  this.kiosNameInput = input;
                }}
                onSubmitEditing={() => {
                  this.telpInput.focus();
                }}
              />
              {edistrict_conv.length > 0 ? (
                <Picker
                  selectedValue={edistrict_id}
                  onValueChange={this.esetSelectedValueDistricts}>
                  <Picker.Item key={-1} label={'Pilih Kecamatan'} value={-1} />
                  {edistrict_conv.map((val, key) => {
                    return (
                      <Picker.Item key={key} label={val.name} value={val.id} />
                    );
                  })}
                </Picker>
              ) : null}
              {evillage_conv.length > 0 ? (
                <Picker
                  selectedValue={evillage_id}
                  enabled={evillage_conv.length === 0 ? false : true}
                  onValueChange={this.esetSelectedValueVillages}>
                  <Picker.Item key={-1} label={'Pilih Desa'} value={-1} />
                  {evillage_conv.map((val, key) => {
                    return (
                      <Picker.Item key={key} label={val.name} value={val.id} />
                    );
                  })}
                </Picker>
              ) : null}
              <Input
                placeholder="Lokasi"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                keyboardAppearance="light"
                returnKeyType="done"
                onChangeText={this.onLocation}
                ref={(input) => {
                  this.location = input;
                }}
              />
              <Input
                placeholder="No Telp"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                keyboardAppearance="light"
                returnKeyType="done"
                onChangeText={this.onNotelp}
                ref={(input) => {
                  this.telpInput = input;
                }}
              />
              <View style={{flexDirection: 'row', padding: 10}}>
                <Text
                  style={{
                    padding: 10,
                    borderWidth: 0,
                    marginRight: 20,
                    color: Colors.DARK_GREY,
                  }}>
                  {timeShow ? timeShow : 'Pilih Jam Buka'}
                </Text>
                <Button
                  buttonStyle={{
                    width: 100,
                  }}
                  onPress={() => this.showTimepicker()}
                  title="Buka Jam"
                />
              </View>
              {showDate ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={'time'}
                  is24Hour={true}
                  display="default"
                  onChange={(val) => this.onChangeTime(val)}
                />
              ) : null}

              <View style={{flexDirection: 'row'}}>
                <Input
                  containerStyle={{
                    width: Dimension.DEVICE_WIDTH / 2 - 20,
                  }}
                  placeholder="Latitude"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  keyboardAppearance="light"
                  returnKeyType="next"
                  onChangeText={this.onLatitude}
                  defaultValue={latitude.toString()}
                  ref={(input) => {
                    this.latitudeInput = input;
                  }}
                />
                <Input
                  containerStyle={{
                    width: Dimension.DEVICE_WIDTH / 2 - 20,
                  }}
                  placeholder="Longitude"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  keyboardAppearance="light"
                  returnKeyType="next"
                  onChangeText={this.onLongitude}
                  defaultValue={longitude.toString()}
                  ref={(input) => {
                    this.longitudeInput = input;
                  }}
                />
              </View>
              <Button
                title="Cari Lokasi"
                onPress={() => this.getGeoLocation()}
                disabled={disabled}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                title="Daftar"
                buttonStyle={{
                  marginTop: 25,
                  width: 100,
                }}
                onPress={this.onRegister}
                disabled={disabled}
              />
              <Button
                title="Clear"
                buttonStyle={{
                  width: 100,
                  marginTop: 25,
                  marginLeft: 10,
                  backgroundColor: Colors.ORANGE,
                }}
                onPress={() =>
                  this.props.navigation.navigate('NavigationRegister')
                }
              />
              <Button
                title="Batal"
                buttonStyle={{
                  marginTop: 25,
                  marginLeft: 10,
                  width: 100,
                  backgroundColor: Colors.REDBLACK,
                }}
                onPress={() =>
                  this.props.navigation.navigate('NavigationRegister')
                }
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

RegisterEwarongScreen.propTypes = {
  navigation: NavigationProps.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => ({
  alldistricts: state.ewarong.alldistricts,
  allvillages: state.ewarong.allvillages,
  district_id: state.ewarong.district_id,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      register,
      setDistrictId,
      getAllDistricts,
      getAllVillages,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterEwarongScreen);
