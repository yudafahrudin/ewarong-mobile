import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  StatusBar
} from "react-native";
import { Button } from "react-native-elements";

class AboutScreen extends Component {
  // static navigationOptions = {
  //   header: null
  // };

  // state = {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="ABOUT MENU"
          onPress={() => this.props.navigation.toggleDrawer()}
        />
      </View>
    );
  }
}

export default AboutScreen;
