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

class NavigationRegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

        <View
          style={{
            // justifyContent: 'center',
            alignItems: 'center',
            width: Dimension.DEVICE_WIDTH,
            height: Dimension.DEVICE_HEIGHT,
            padding: Dimension.DEVICE_HEIGHT / 14,
          }}>
          <Logo />
          <Text style={{fontWeight: 'bold', fontSize: 25}}>
            E-Warong Sidoarjo
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Dimension.DEVICE_HEIGHT / 6,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}
              style={{alignItems: 'center', marginRight: 50}}>
              <Icon name="user" size={100} color={Colors.DARK_GREY} />
              <Text style={{fontWeight: 'bold'}}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('RegisterEwarong')}
              style={{alignItems: 'center'}}>
              <Icon name="home" size={100} color={Colors.DARK_GREY} />
              <Text style={{fontWeight: 'bold'}}>User + Pemilik Kios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

NavigationRegisterScreen.propTypes = {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationRegisterScreen);
