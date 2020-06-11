import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';
import { marginClass } from '../constants/styles';

const Loader = () => (
  <View style={{ flex: 1, justifyContent: 'center', margin: marginClass.md }}>
    <ActivityIndicator size="large" color={Colors.YELLOW} />
  </View>
);

export default Loader;
