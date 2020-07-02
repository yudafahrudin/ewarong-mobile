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
import {logout} from '../../../actions/session';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';
import EndPoint from '../../../constants/endPoints';

class ProfileContainer extends Component {
  state = {
    orders: [],
    modalVisible: false,
    ewarong: null,
    disabled: false,
  };

  async componentDidMount() {}

  logoutSession() {
    const {actions} = this.props;
    actions.logout();
    this.navigateScreen('AuthLoading');
  }

  render() {
    const {user, navigate} = this.props;
    const {ewarong, orders, disabled, modalVisible} = this.state;

    return (
      <ScrollView
        style={{
          flex: 1,
          width: Dimension.DEVICE_WIDTH,
        }}>
        <View
          style={{
            height: Dimension.DEVICE_HEIGHT / 1.3,
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
          <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
            {user.name}{' '}
          </Text>
          <Text style={{alignSelf: 'center', marginVertical: 10, fontSize: 15}}>
            {user.email}{' '}
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 15}}>
            Tanggal Join {user.date_register}{' '}
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 13}}>
            {user.address}{' '}
          </Text>
          {/* <Button
            title={'EDIT'}
            onPress={() => navigate('HomeScreen')}
            disabled={disabled}
            buttonStyle={{
              alignSelf: 'center',
              width: Dimension.DEVICE_WIDTH - 100,
              margin: 10,
              marginTop: 10,
            }}
          /> */}
          <Button
            title={'LOGOUT'}
            onPress={() => this.logoutSession()}
            disabled={disabled}
            buttonStyle={{
              backgroundColor: Colors.REDBLACK,
              alignSelf: 'center',
              width: Dimension.DEVICE_WIDTH - 100,
              margin: 10,
              marginTop: 25,
            }}
          />
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
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
