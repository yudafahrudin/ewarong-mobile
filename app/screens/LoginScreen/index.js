/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
// ACTION
import {login} from '../../actions/session';
// COMPONENT
import Logo from './components/Logo';
import {Button, Text, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// CONSTANTS
import Colors from '../../constants/colors';
import Dimension from '../../constants/dimensions';
import NavigationProps from '../../constants/propTypes/navigation';
import {fontSizeClass} from '../../constants/styles';

const BG = require('../../assets/app_logo_3.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
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
      username: 'cabangmojokerto@gmail.com',
      password: 'adminadmin',
      disabled: false,
      showEye: false,
    };
  }

  componentDidMount() {
    const {username} = this.state;
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

  onChangeUsername = (username) => {
    this.setState({
      username,
    });
  };

  onChangePassword = (password) => {
    this.setState({
      password,
    });
  };

  onPressLogin = async () => {
    const {username, password} = this.state;
    const {actions} = this.props;
    this.setState({
      disabled: true,
    });
    if (username && password) {
      await actions
        .login(username, password, () => this.navigateApp())
        .then()
        .catch((err) => {
          this.setState({
            disabled: false,
          });
        });
    } else {
      Alert.alert('Error', 'Mohon untuk memasukan Username / Password');
      this.setState({
        disabled: false,
      });
    }
  };

  navigateApp() {
    const {navigation} = this.props;
    navigation.navigate('App');
  }

  render() {
    const {disabled, username, showEye} = this.state;
    const textLogin = disabled ? 'Please wait' : 'Masuk';

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={
          Dimension.DEVICE_HEIGHT / 10 - (Dimension.DEVICE_HEIGHT * 2) / 7
        }>
        <StatusBar backgroundColor={Colors.BLACK} />
        <TouchableOpacity
          style={{
            padding: 10,
            position: 'absolute',
            margin: 20,
            right: 0,
          }}
          onPress={() => this.navigateApp('HomeScreen')}>
          <Text style={{fontSize: 15}}>
            Lihat tanpa login <Icon name="arrow-right" size={15} />
          </Text>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimension.DEVICE_WIDTH,
            height: Dimension.DEVICE_HEIGHT,
            paddingHorizontal: 20,
          }}>
          <Logo />
          <Input
            placeholder="Email"
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            keyboardAppearance="light"
            returnKeyType="next"
            value={`${username}`}
            ref={(input) => {
              this.emailInput = input;
            }}
            onChangeText={this.onChangeUsername}
          />
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
            }}>
            <Input
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              keyboardAppearance="light"
              ref={(input) => {
                this.passwordInput = input;
              }}
              blurOnSubmit
              secureTextEntry={!showEye}
              onChangeText={this.onChangePassword}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showEye: !showEye,
                });
              }}
              style={{
                marginLeft: -35,
                marginBottom: 10,
                justifyContent: 'center',
              }}>
              <Icon name="eye" size={20} color={Colors.DARK_GREY} />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Button
              title={textLogin}
              buttonStyle={{
                width: 100,
              }}
              onPress={this.onPressLogin}
              disabled={disabled}
            />
            <Button
              title="Daftar"
              buttonStyle={{
                marginLeft: 20,
                width: 100,
                backgroundColor: Colors.YELLOWBLACK,
              }}
              onPress={() => this.props.navigation.navigate('Register')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.propTypes = {
  navigation: NavigationProps.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      login,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
