/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import { TouchableWithoutFeedback, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import EditAccountContainer from './containers/EditAccountContainer';

const data = () => {
  Alert.alert(123);
};

class EditAccountScreen extends Component {
  static navigationOptions = {
    title: 'Edit Akun',
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    // headerRight: (
    //   <TouchableWithoutFeedback onPress={data}>
    //     <Icon
    //       name="check"
    //       size={30}
    //       color="white"
    //       containerStyle={{
    //         backgroundColor: 'blue',
    //         padding: 5,
    //         position: 'absolute',
    //         top: 5,
    //         right: 0,
    //       }}
    //       iconStyle={{ marginRight: 10 }}
    //     />
    //   </TouchableWithoutFeedback>
    // ),
  };

  navigateTo = (screen, params) => {
    this.props.navigation.navigate(screen, params);
  };

  render() {
    return (
      <EditAccountContainer
        navigation={this.props.navigation}
        navigate={this.navigateTo}
      />
    );
  }
}

export default EditAccountScreen;
