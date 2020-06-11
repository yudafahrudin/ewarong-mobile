/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
// ACTION
import { register } from '../../actions/session';
// COMPONENT
import Logo from './components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';
// CONSTANTS
import Colors from '../../constants/colors';
import Dimension from '../../constants/dimensions';
import NavigationProps from '../../constants/propTypes/navigation';
import { fontSizeClass } from '../../constants/styles';

const BG = require('../../assets/app-33.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  body: {
    alignItems: 'flex-start',
    marginTop: -30,
  },
  buttonLogin: {
    marginTop: 25,
    width: 100,
    backgroundColor: Colors.REDBLACK,
  },
  buttonScanBarcode: {
    marginTop: 25,
    marginLeft: 10,
    backgroundColor: Colors.YELLOWBLACK,
  },
  noAccountView: {
    marginTop: 20,
  },
  noAccountText: {
    color: Colors.TEXT_BLACK,
    fontSize: fontSizeClass.sm,
  },
});

class RegisterScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: null,
      password_conf: null,
      hp_email: null,
      disabled: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid,
    );
    const { username } = this.state;
    const barcodeFromScan = _.get(
      this.props.navigation.state.params,
      'barcodeId',
    );
    if (barcodeFromScan) {
      if (barcodeFromScan !== username) {
        this.setState({
          username: barcodeFromScan,
        });
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.backHandler.remove();
  }

  onBackButtonPressAndroid = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
    return true;
  };

  onRegister = async () => {
    const { actions, navigation } = this.props;
    const { username, password, password_conf, hp_email } = this.state;
    if (username && password && password_conf && hp_email) {
      if (password !== password_conf) {
        Alert.alert('Error', 'Password dan konfirmasi password tidak sama');
        return null;
      }
      this.setState({
        disabled: true,
      });
      await actions
        .register(
          {
            username,
            password,
            password_conf,
            hp_email,
          },
          () => navigation.navigate('App'),
        )
        .catch(err => {
          Alert.alert('ID sudah di daftarkan!');
          this.setState({
            disabled: false,
          });
        });
    } else {
      Alert.alert('Error', 'Mohon untuk mengisi semua data');
    }
  };

  onChangeUsername = username => {
    this.setState({
      username,
    });
  };

  onChangePassword = password => {
    this.setState({
      password,
    });
  };

  onConfirmPassword = password_conf => {
    this.setState({
      password_conf,
    });
  };

  onChangeMail = hp_email => {
    this.setState({
      hp_email,
    });
  };

  render() {
    const { disabled, username } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar backgroundColor={Colors.BLACK} />

        <ScrollView>
          <ImageBackground
            source={BG}
            resizeMode="stretch"
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: Dimension.DEVICE_WIDTH,
              height: Dimension.DEVICE_HEIGT,
              backgroundColor: 'red',
              marginTop: -2,
            }}
          >
            <View style={styles.body}>
              <Logo />
              <Text fontType="normal" style={styles.noAccountText}>
                {'Register No. ID Member anda'}
              </Text>
              <Input
                placeholder="ID Member"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                keyboardAppearance="light"
                returnKeyType="next"
                value={`${username}`}
                ref={input => {
                  this.emailInput = input;
                }}
                onChangeText={this.onChangeUsername}
              />
              <Input
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                keyboardAppearance="light"
                ref={input => {
                  this.passwordInput = input;
                }}
                blurOnSubmit
                secureTextEntry
                onChangeText={this.onChangePassword}
              />
              <Input
                placeholder="Konfirmasi Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                keyboardAppearance="light"
                ref={input => {
                  this.passwordInput = input;
                }}
                blurOnSubmit
                secureTextEntry
                onChangeText={this.onConfirmPassword}
                // value={password}
              />
              <Input
                placeholder="No HP/Email"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                keyboardAppearance="light"
                returnKeyType="done"
                ref={input => {
                  this.emailInput = input;
                }}
                onChangeText={this.onChangeMail}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Button
                  title="Daftar"
                  style={styles.buttonLogin}
                  onPress={this.onRegister}
                  disabled={disabled}
                />
                <Button
                  title="Scan Barcode"
                  style={styles.buttonScanBarcode}
                  onPress={() =>
                    this.props.navigation.navigate('ScanBarcode', {
                      page: 'Register',
                    })
                  }
                />
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

RegisterScreen.propTypes = {
  navigation: NavigationProps.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      register,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
