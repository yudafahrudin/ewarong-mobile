import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Dimension from '../../../constants/dimensions';

class TermsContainer extends Component {
  state = {};

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            padding: 15,
            width: Dimension.DEVICE_WIDTH,
          }}
        >
          <Text style={{ fontSize: 20 }}>Syarat</Text>
          <Text style={{ fontSize: 13 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={{ fontSize: 20, marginTop: 10 }}>Ketentuan</Text>
          <Text style={{ fontSize: 13 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default TermsContainer;
