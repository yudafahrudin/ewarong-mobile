/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  ImageBackground,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
// ACTION
import { login } from '../../actions/session';
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
  buttonLogin: {
    marginTop: 25,
    width: 120,
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

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      disabled: false,
    };
  }

  componentWillReceiveProps() {
    console.log('receive prop');
  }

  componentDidMount() {
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

  onPressLogin = async () => {
    const { username, password } = this.state;
    const { actions } = this.props;
    this.setState({
      disabled: true,
    });
    if (username && password) {
      await actions.login(username, password, () => this.navigateApp());
    } else {
      Alert.alert('Error', 'Mohon untuk memasukan ID member / Password');
    }
    this.setState({
      disabled: false,
    });
  };

  navigateApp() {
    const { navigation } = this.props;
    navigation.navigate('App');
  }

  render() {
    const { disabled, username } = this.state;
    const textLogin = disabled ? 'Please wait' : 'Masuk';

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={
          Dimension.DEVICE_HEIGT / 10 - (Dimension.DEVICE_HEIGT * 2) / 7
        }
      >
        <StatusBar backgroundColor={Colors.BLACK} />
        <ImageBackground
          source={BG}
          resizeMode="stretch"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimension.DEVICE_WIDTH,
            height: Dimension.DEVICE_HEIGT,
            backgroundColor: 'black',
          }}
        >
          <View
            style={{
              alignItems: 'flex-start',
              marginTop: -30,
            }}
          >
            <Logo />
            <Text fontType="normal" style={styles.noAccountText}>
              {'Masukan No. ID Member anda'}
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
              returnKeyType="done"
              keyboardAppearance="light"
              ref={input => {
                this.passwordInput = input;
              }}
              blurOnSubmit
              secureTextEntry
              onChangeText={this.onChangePassword}
            />
            <View style={styles.noAccountView}>
              <Text fontType="normal" style={styles.noAccountText}>
                {'Pastikan No. ID Member Anda telah terdaftar'}
              </Text>
              <Text
                fontType="bold"
                onPress={() => this.props.navigation.navigate('Register')}
                style={
                  (styles.noAccountText,
                    { color: Colors.REDBLACK, fontWeight: 'bold' })
                }
              >
                {'Daftar Sekarang'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                title={textLogin}
                style={styles.buttonLogin}
                onPress={this.onPressLogin}
                disabled={disabled}
              />
              <Button
                title="Scan Barcode"
                style={styles.buttonScanBarcode}
                onPress={() => this.props.navigation.navigate('ScanBarcode')}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.propTypes = {
  navigation: NavigationProps.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      login,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
