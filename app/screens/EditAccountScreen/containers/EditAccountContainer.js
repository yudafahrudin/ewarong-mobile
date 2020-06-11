/* eslint-disable arrow-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable implicit-arrow-linebreak */
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import randomColor from 'randomcolor';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProfile, updateProfile } from '../../../actions/profile';
import Input from '../../../components/Input';
import Color from '../../../constants/colors';
import Dimension from '../../../constants/dimensions';
import Button from '../../../components/Button';

class EditAccountContainer extends Component {
  state = {
    loadingPage: true,
    profile: null,
    onSubmitData: false,
    phoneInput: null,
    emailInput: null,
    passwordInput: null,
  };

  async componentDidMount() {
    const { actions } = this.props;

    await actions.getProfile();
    this.setState({
      loadingPage: false,
      profile: this.props.profile,
    });
  }

  updateProfileInfo = async () => {
    const { passwordInput, emailInput, phoneInput } = this.state;
    const dataSend = {};
    if (passwordInput) {
      dataSend.password = passwordInput;
    }
    if (emailInput) {
      dataSend.email = emailInput;
    }
    if (passwordInput) {
      dataSend.phone = phoneInput;
    }

    if (Object.keys(dataSend) === 0) {
      Alert.alert('GAGAL', 'Data kosong');
    } else {
      this.setState({
        onSubmitData: true,
      });
      const { actions } = this.props;
      await actions.updateProfile(dataSend);
      this.setState({
        onSubmitData: false,
      });
    }
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigate('PromoDetailScreen', {
            promoTitle: item.PROMOTION_NAME,
            imageUrl: `https://pramita.serveo.net/${item.IMAGE_LINK}`,
            content: item.CONTENT,
          })
        }
        style={{
          backgroundColor: randomColor(),
          borderRadius: 100 / 12,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <ImageBackground
          style={{ height: 80, width: 200 }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 100 / 12 }}
          source={{ uri: `https://pramita.serveo.net/${item.IMAGE_LINK}` }}
        />
      </TouchableOpacity>
    );
  };

  onChangePhone = phoneInput => {
    this.setState({
      phoneInput,
    });
  };

  onChangeEmail = emailInput => {
    this.setState({
      emailInput,
    });
  };

  onChangePassword = passwordInput => {
    this.setState({
      passwordInput,
    });
  };

  render() {
    const {
      loadingPage,
      profile,
      onSubmitData,
      phoneInput,
      emailInput,
    } = this.state;
    const PatientId = _.get(profile, 'PATIENT_ID') || '';
    const UserName = _.get(profile, 'PATIENT_NAME') || '';
    const titleName = _.get(profile, 'TITLE_NAME') || '';
    // const phone = _.get(profile, 'PHONE');
    const email = _.get(profile, 'EMAIL');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fffff',
        }}
      >
        {loadingPage ? (
          <View
            style={{
              width: Dimension.DEVICE_WIDTH,
              height: Dimension.DEVICE_HEIGT,
              backgroundColor: Color.BLACK,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              zIndex: 1,
              opacity: 0.5,
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : null}
        <ScrollView>
          <View
            style={{ padding: Dimension.DEVICE_WIDTH / 9, marginBottom: 50 }}
          >
            <View
              style={{
                height: 200,
                alignItems: 'center',
                padding: 15,
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: '#024a74',
                  borderRadius: 50,
                }}
              />
              <View style={{ margin: 10 }}>
                <Text
                  style={{ fontSize: 16 }}
                >{`${UserName}, ${titleName}`}</Text>
                <Text
                  style={{ fontSize: 16, marginTop: 10 }}
                >{`${PatientId}`}</Text>
              </View>
            </View>
            <Input
              placeholder="No HP"
              keyboardType="numeric"
              onChangeText={this.onChangePhone}
              defaultValue={phoneInput}
            />
            <Input
              placeholder={email || 'Email'}
              defaultValue={emailInput}
              onChangeText={this.onChangeEmail}
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
              onChangeText={this.onChangePassword}
            />
            <Button
              title="save"
              disabled={onSubmitData}
              onPress={() => this.updateProfileInfo()}
              buttonStyle={{
                backgroundColor: 'red',
                marginTop: 20,
                width: 100,
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  promo: state.packageOrPromo.promo,
  profile: state.profile.profile,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getProfile, updateProfile }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditAccountContainer);
