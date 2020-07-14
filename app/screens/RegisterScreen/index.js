/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import _, {values, filter} from 'lodash';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-community/picker';
import {Button, Input, Text} from 'react-native-elements';
// import {TabView, SceneMap} from 'react-native-tab-view';
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

class RegisterScreen extends Component {
  _isMounted = false;
  state = {
    name: null,
    address: null,
    type: 'umum',
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
    village_id: -1,
    districts: [],
    villages: [],
    villagesUses: [],
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
      const villages = Object.values(alldistricts.villages);
      this.setState({
        districts,
        villages,
        villagesUses: villages,
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
      telp,
      district_id,
      village_id,
    } = this.state;
    console.log(this.state);
    if (district_id != -1 && village_id != -1 && type == 'umum') {
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
          district_id,
          village_id,
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

  onChangeMail = (email) => {
    this.setState({
      email,
    });
  };

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
  sortByname = (obj) => {
    return obj ? obj.sort((a, b) => (a.name > b.name ? 1 : -1)) : null;
  };
  render() {
    const {
      disabled,
      district_id,
      village_id,
      districts,
      villagesUses,
    } = this.state;
    const district_conv = districts ? this.sortByname(districts) : [];
    const village_conv = villagesUses ? this.sortByname(villagesUses) : [];

    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <StatusBar backgroundColor={Colors.BLACK} />
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: Dimension.DEVICE_HEIGHT,
            }}>
            <View style={{width: Dimension.DEVICE_WIDTH - 50}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                <Icon name="user" size={30} color={Colors.DARK_GREY} />
                <Text
                  style={{fontWeight: 'bold', fontSize: 21, marginLeft: 15}}>
                  FORM PENDAFTARAN USER
                </Text>
              </View>
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

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 25,
              }}>
              <Button
                title="Daftar"
                buttonStyle={{
                  width: 100,
                }}
                onPress={this.onRegister}
                disabled={disabled}
              />
              <Button
                title="Clear"
                buttonStyle={{
                  width: 100,
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
                  width: 100,
                  marginLeft: 10,
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

{
  /* 
        <TabView
          navigationState={{index, routes}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'user':
                return this.firstRoute();
              case 'userrpk':
                return this.secondRoute();
              default:
                return null;
            }
          }}
          onIndexChange={this.setIndex}
          initialLayout={{
            width: Dimension.DEVICE_WIDTH,
          }}
        /> */
}

RegisterScreen.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
