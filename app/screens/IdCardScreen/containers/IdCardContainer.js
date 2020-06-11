import React, { Component } from 'react';
import { View, ScrollView, Image, ImageBackground, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Dimension from '../../../constants/dimensions';

const idCard = require('../../../assets//app-35.png');
const bg1 = require('../../../assets/background-1.png');

class IdCardContainer extends Component {
  state = {};

  render() {
    const { data, barcode } = this.props.user;
    const UserName = _.get(data, 'patient_name');
    const PatientId = _.get(data, 'patient_id');
    const titleName = _.get(data, 'title_name');
    return (
      <ScrollView style={{ backgroundColor: '#ececec' }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={bg1}
            style={{
              height: 200,
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 15,
            }}
          >
            <Icon
              name="arrow-back"
              containerStyle={{
                padding: 5,
                position: 'absolute',
                top: 5,
                left: 0,
              }}
              iconStyle={{ marginLeft: 5 }}
              size={30}
              onPress={() => this.props.navigation.goBack()}
            />
            <View
              style={{
                width: 70,
                height: 70,
                marginTop: 30,
                backgroundColor: '#024a74',
                borderRadius: 50,
              }}
            />
            <Text
              style={{ fontSize: 16, marginTop: 10 }}
            >{`${UserName}, ${titleName}`}</Text>
          </ImageBackground>
          <View style={{ alignItems: 'center' }}>
            <ImageBackground
              source={idCard}
              style={{
                width: Dimension.DEVICE_WIDTH - 20,
                height: 220,
                marginVertical: 10,
              }}
            >
              <Text style={{ padding: 10, marginLeft: 10, paddingBottom: 0 }}>
                KARTU ID MEMBER
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 30 }}>{` ${PatientId}`}</Text>
              </View>
            </ImageBackground>
            <Image
              source={{ uri: barcode }}
              style={{ width: 250, height: 80, marginTop: 30 }}
              resizeMode="stretch"
            />
            {/* <Text
              style={{ color: 'black', fontSize: 20 }}
            >{`00000000000${Id}`}</Text> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  user: state.session.user,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IdCardContainer);
