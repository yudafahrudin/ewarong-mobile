/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
import Logo from './components/Logo';
import {bindActionCreators} from 'redux';

import Dimension from '../../constants/dimensions';

// const Logo = require('../../assets/app_logo_4.png');
const Bg = require('../../assets/app-32.png');

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.checkAuthentication(), 500);
  }

  checkAuthentication = () => {
    const {user, navigation} = this.props;
    if (user) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{alignSelf: 'center'}}>
          <Logo />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Mohon Tunggu...
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: _.get(state.session, 'user'),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
