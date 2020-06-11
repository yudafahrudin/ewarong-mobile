/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dimension from '../../constants/dimensions';

const Logo = require('../../assets/app_logo_4.png');
const Bg = require('../../assets/app-32.png');

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => this.checkAuthentication(), 500);
  }

  checkAuthentication = () => {
    const { user, navigation } = this.props;
    if (user) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={Bg}
          resizeMode="cover"
          style={{
            alignItems: 'center',
            width: Dimension.DEVICE_WIDTH,
            height: Dimension.DEVICE_HEIGT,
            backgroundColor: 'white',
          }}
          imageStyle={{
            width: Dimension.DEVICE_WIDTH + 10,
            height: Dimension.DEVICE_HEIGT + 10,
          }}
        >
          <Image
            source={Logo}
            style={{ width: '70%', marginTop: 100 }}
            resizeMode="contain"
          />
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: _.get(state.session, 'user'),
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
