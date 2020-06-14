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
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, Input, Text} from 'react-native-elements';
import {TabView, SceneMap} from 'react-native-tab-view';
import Geolocation from '@react-native-community/geolocation';
// ACTION
import {register} from '../../actions/session';
// COMPONENT
import Logo from './components/Logo';
// import Input from '../../components/Input';
// CONSTANTS
import Colors from '../../constants/colors';
import Dimension from '../../constants/dimensions';
import NavigationProps from '../../constants/propTypes/navigation';

class RegisterScreen extends Component {
  _isMounted = false;
  state = {
    name: null,
    address: null,
    routes: [
      {key: 'user', title: 'User Biasa'},
      {key: 'userrpk', title: 'User + Kios'},
    ],
    index: 0,
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
  };

  setIndex = (index) => {
    if (index == 0) {
      this.setState({
        index,
        type: 'umum',
      });
    } else {
      this.setState({
        index,
        type: 'rpk',
      });
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );
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
    } = this.state;
    console.log(this.state);
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

  firstRoute = () => {
    const {disabled} = this.state;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimension.DEVICE_HEIGHT / 1.2,
        }}>
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

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
            title="Batal"
            buttonStyle={{
              marginTop: 25,
              marginLeft: 20,
              width: 100,
              backgroundColor: Colors.REDBLACK,
            }}
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    );
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

  secondRoute = () => {
    const {disabled, latitude, longitude, timeShow, showDate} = this.state;
    return (
      <ScrollView style={{paddingTop: 50, marginBottom: 10, flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginBottom: '30%',
          }}>
          <Text style={{fontSize: 18}}> User Form </Text>
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
          <Text style={{fontSize: 18}}> Kios Form </Text>
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
                defaultValue={latitude.toString()}
                disabled={true}
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
                defaultValue={longitude.toString()}
                disabled={true}
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
              title="Batal"
              buttonStyle={{
                marginTop: 25,
                marginLeft: 20,
                width: 100,
                backgroundColor: Colors.REDBLACK,
              }}
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  render() {
    const {index, routes} = this.state;

    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <StatusBar backgroundColor={Colors.BLACK} />

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
        />
      </KeyboardAvoidingView>
    );
  }
}

RegisterScreen.propTypes = {
  navigation: NavigationProps.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      register,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
