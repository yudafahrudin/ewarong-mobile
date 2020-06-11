import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

class AccountScreen extends Component {
  state = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="OPEN MENU"
          onPress={() => this.props.navigation.toggleDrawer()}
        />
        <Text>Account Screen</Text>
      </View>
    );
  }
}

export default AccountScreen;
