/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import { View, Text, Image, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import Dimension from '../../../constants/dimensions';
import { getBooking, cancelBooking } from '../../../actions/booking';

class CodebookingContainer extends Component {
  state = {
    disabled: false,
  };

  async componentDidMount() {
    const { actions } = this.props;
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
    await actions.getBooking();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    this.props.navigate('HomeScreen');
    return true;
  };

  render() {
    const { actions } = this.props;
    console.log('cek', this.props.booking);
    const data = _.get(this.props.booking.booking, 'data') || [];
    const msg = _.get(this.props.booking.booking, 'msg');
    console.log('data', data);
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: Dimension.DEVICE_WIDTH,
        }}
      >
        {data.length > 0 ? (
          <View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#ececec',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: Dimension.DEVICE_WIDTH,
              }}
            >
              <Image
                style={{
                  width: Dimension.DEVICE_WIDTH - 120,
                  height: Dimension.DEVICE_WIDTH - 120,
                }}
                source={{
                  uri: data[0].qrcode,
                }}
              />
              <Text style={{ margin: 10, marginTop: 0, fontSize: 15 }}>
                Barcode Antrian
              </Text>
            </View>
            <View
              style={{
                padding: 15,
                alignItems: 'flex-start',
                flex: 1,
                width: Dimension.DEVICE_WIDTH,
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 15 }}
                >
                  Tanggal Booking :{' '}
                  {moment(_.get(data, 'D_TGL')).format('Do MMMM YYYY')}
                </Text>
                <Text>Booking Layanan</Text>
                <Text
                  style={{
                    margin: 15,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  {_.get(data[0], 'v_layanandetail') ||
                    _.get(data[0], 'package_name')}
                </Text>
              </View>
            </View>
            <Button
              title="BATALKAN"
              disabled={this.state.disabled}
              onPress={async () => {
                this.setState({
                  disabled: true,
                });
                await actions.cancelBooking(_.get(data[0], 'id_booking'), () =>
                  this.props.navigate('HomeScreen'),
                );
                this.setState({
                  disabled: false,
                });
              }}
              buttonStyle={{
                position: 'absolute',
                bottom: 0,
                borderRadius: 100 / 8,
                backgroundColor: '#FFF',
                borderWidth: 1,
                borderColor: 'red',
                padding: 20,
                alignSelf: 'center',
                margin: 18,
                width: 150,
              }}
              titleStyle={{
                color: 'red',
              }}
            />
          </View>
        ) : (
          <Text style={{ fontSize: 15 }}>{msg || ''}</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
  booking: state.booking,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getBooking,
      cancelBooking,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodebookingContainer);
