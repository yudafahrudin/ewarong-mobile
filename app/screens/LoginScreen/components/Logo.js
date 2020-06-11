import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const logoImg = require('../../../assets/app_logo_3.png');

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginLeft: -10,
    justifyContent: 'center',
  },
});

const LogoComponent = () => (
  <View style={styles.container}>
    <Image source={logoImg} style={{ width: 200, height: 40 }} />
  </View>
);

export default LogoComponent;
