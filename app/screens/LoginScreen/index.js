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
  TouchableWithoutFeedback,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
// ACTION
import {login} from '../../actions/session';
// COMPONENT
import Logo from './components/Logo';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Text} from 'react-native-elements';
// CONSTANTS
import Colors from '../../constants/colors';
import Dimension from '../../constants/dimensions';
import NavigationProps from '../../constants/propTypes/navigation';
import {fontSizeClass} from '../../constants/styles';

const BG = require('../../assets/app-33.jpg');

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
      await actions.login(username, password, () => this.navigateApp());
    } else {
      Alert.alert('Error', 'Mohon untuk memasukan Username / Password');
    }
    this.setState({
      disabled: false,
    });
  };

  navigateApp() {
    const {navigation} = this.props;
    navigation.navigate('App');
  }

  render() {
    const {disabled, username} = this.state;
    const textLogin = disabled ? 'Please wait' : 'Masuk';

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={
          Dimension.DEVICE_HEIGHT / 10 - (Dimension.DEVICE_HEIGHT * 2) / 7
        }>
        <StatusBar backgroundColor={Colors.BLACK} />
        <TouchableWithoutFeedback
          onPress={() => this.navigateApp('HomeScreen')}>
          <Text
            style={{fontSize: 15, position: 'absolute', margin: 20, right: 0}}>
            Lihat tanpa login <Icon name="arrow-right" size={15} />
          </Text>
        </TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimension.DEVICE_WIDTH,
            height: Dimension.DEVICE_HEIGHT,
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
            secureTextEntry
            onChangeText={this.onChangePassword}
          />
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
              onPress={() => this.props.navigation.navigate('ScanBarcode')}
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
