/* eslint-disable import/named */
import React, {Component} from 'react';
import {
  View,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListItem, Text, Input, Button} from 'react-native-elements';
import _ from 'lodash';
import {logout, updateprofile} from '../../../actions/session';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';
import EndPoint from '../../../constants/endPoints';
import {color} from 'react-native-reanimated';

class ProfileContainer extends Component {
  state = {
    orders: [],
    modalVisible: false,
    ewarong: null,
    disabled: false,
    isEdit: false,
    name: null,
    address: null,
    password: null,
  };

  async componentDidMount() {}

  navigateScreen = (screen) => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  async logoutSession() {
    const {actions, navigate} = this.props;
    await actions.logout();
    await navigate('AuthLoading');
  }

  async onUpdateProfile() {
    const {name, address, password} = this.state;
    const {actions} = this.props;
    await actions.updateprofile({
      name,
      address,
      password,
    });
    this.setState({
      isEdit: false,
    });
  }

  onChangeName = (name) => {
    this.setState({
      name,
    });
  };
  onChangeAddress = (address) => {
    this.setState({
      address,
    });
  };
  onChangePassword = (password) => {
    this.setState({
      password,
    });
  };

  render() {
    const {user, navigate} = this.props;
    const {ewarong, orders, disabled, isEdit} = this.state;

    return (
      <ScrollView
        style={{
          flex: 1,
          width: Dimension.DEVICE_WIDTH,
        }}>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              marginVertical: 10,
              alignSelf: 'center',
            }}>
            {user ? (
              user.image_url ? (
                <Image
                  source={{
                    uri: `${EndPoint.BASE_URL}${EndPoint.profileImageUrl}/${user.image_url}`,
                  }}
                  style={{width: 150, height: 150, borderRadius: 50}}
                />
              ) : (
                <Image
                  source={require('../../../assets/user.png')}
                  style={{width: 150, height: 150, borderRadius: 50}}
                />
              )
            ) : null}
          </View>
          {user ? (
            <View>
              <Text
                style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
                {user.name}{' '}
              </Text>
              <Text style={{alignSelf: 'center', fontSize: 15}}>
                {user.email}{' '}
              </Text>
              <Text style={{alignSelf: 'center', fontSize: 15}}>
                Tanggal Join {user.date_register}{' '}
              </Text>
              <Text style={{alignSelf: 'center', fontSize: 15}}>
                Alamat : {user.address}{' '}
              </Text>
            </View>
          ) : null}
          {isEdit ? (
            <View style={{paddingHorizontal: 20}}>
              <Input
                placeholder={user.name ? user.name : 'Tulis Nama'}
                autoCapitalize="none"
                keyboardAppearance="light"
                autoFocus={false}
                autoCorrect={false}
                returnKeyType="next"
                onChangeText={(val) => this.onChangeName(val)}
                onSubmitEditing={() => {
                  this.addressInput.focus();
                }}
              />
              <Input
                placeholder={user.address ? user.address : 'Tulis Alamat'}
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                keyboardAppearance="light"
                returnKeyType="next"
                onChangeText={this.onChangeAddress}
                ref={(input) => {
                  this.addressInput = input;
                }}
                onSubmitEditing={() => {
                  this.passwordInput.focus();
                }}
              />
              <Input
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                keyboardAppearance="light"
                blurOnSubmit
                secureTextEntry
                ref={(input) => {
                  this.passwordInput = input;
                }}
                onChangeText={this.onChangePassword}
              />
              <Button
                title={'SAVE'}
                onPress={() => this.onUpdateProfile()}
                disabled={disabled}
                buttonStyle={{
                  alignSelf: 'center',
                  width: Dimension.DEVICE_WIDTH - 100,
                  margin: 10,
                  marginTop: 10,
                }}
              />
              <Button
                title={'CANCEL'}
                onPress={() => this.setState({isEdit: false})}
                disabled={disabled}
                buttonStyle={{
                  alignSelf: 'center',
                  backgroundColor: Colors.ORANGE,
                  width: Dimension.DEVICE_WIDTH - 100,
                  margin: 10,
                  marginTop: 10,
                }}
              />
            </View>
          ) : (
            <View>
              <Button
                title={'EDIT'}
                onPress={() =>
                  this.setState({
                    isEdit: true,
                  })
                }
                disabled={disabled}
                buttonStyle={{
                  alignSelf: 'center',
                  width: Dimension.DEVICE_WIDTH - 100,
                  margin: 10,
                  marginTop: 10,
                }}
              />
              <Button
                title={'LOGOUT'}
                onPress={() => this.logoutSession()}
                disabled={disabled}
                buttonStyle={{
                  backgroundColor: Colors.REDBLACK,
                  alignSelf: 'center',
                  width: Dimension.DEVICE_WIDTH - 100,
                  margin: 10,
                  marginTop: 10,
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.session.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      logout,
      updateprofile,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
