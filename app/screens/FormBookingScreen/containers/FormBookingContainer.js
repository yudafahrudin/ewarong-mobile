/* eslint-disable import/named */
import React, { Component } from 'react';
import { View, Text, Alert, Picker, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import { getLayanan, postBooking } from '../../../actions/booking';
import Dimension from '../../../constants/dimensions';
import Color from '../../../constants/colors';
import Button from '../../../components/Button';
import { getPackage } from '../../../actions/packagePromo';

class FormBookingContainer extends Component {
  state = {
    layanan: [],
    indexSelect: -1,
    selectPackage: false,
    packageId: -1,
    disabled: false,
    disabledFeature: false,
    loadingPage: true,
  };

  async componentDidMount() {
    const { actions } = this.props;

    if (_.get(this.props, 'packageId')) {
      this.setState({
        selectPackage: true,
      });
    }

    if (_.get(this.props, 'disableFeature')) {
      this.setState({
        disabledFeature: true,
      });
    }

    await actions.getLayanan();
    await actions.getPackage();
    this.setState({
      layanan: this.props.layanan.data,
      loadingPage: false,
      packageId: _.get(this.props.package, 'data')[0].package_id,
    });
  }

  render() {
    const {
      layanan,
      indexSelect,
      selectPackage,
      packageId,
      disabledFeature,
      disabled,
      loadingPage,
    } = this.state;
    const { actions } = this.props;

    return (
      <View
        style={{
          flex: 1,
          width: Dimension.DEVICE_WIDTH,
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
        <Text
          style={{
            fontSize: 17,
            margin: 20,
            backgroundColor: '#EEAB21',
            padding: 10,
            color: '#fff',
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          Pilih Layanan
        </Text>
        {layanan.map((l, i) => {
          if (l.v_layanandetail !== 'Membership' && disabledFeature === false) {
            return (
              <ListItem
                key={i}
                title={l.v_layanandetail}
                titleStyle={{ fontSize: 15, color: 'black' }}
                containerStyle={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                underlayColor="transparent"
                leftIcon={{
                  name: l.checked
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked',
                }}
                onPress={() => {
                  layanan[i].checked = true;
                  layanan.forEach((val, index) => {
                    if (index !== i) {
                      layanan[index].checked = false;
                    }
                  });
                  this.setState({
                    layanan,
                    selectPackage: false,
                    indexSelect: i,
                  });
                }}
              />
            );
          }
        })}
        <ListItem
          title={'Paket'}
          titleStyle={{ fontSize: 15, color: 'black' }}
          containerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          underlayColor="transparent"
          leftIcon={{
            name: selectPackage
              ? 'radio-button-checked'
              : 'radio-button-unchecked',
          }}
          onPress={() => {
            if (layanan.length !== 0 && indexSelect !== -1) {
              layanan[indexSelect].checked = false;
            }
            console.log(indexSelect);
            this.setState({
              selectPackage: true,
              layanan,
              indexSelect: -1,
            });
          }}
        />
        <View
          style={{
            borderWidth: 1,
            width: 300,
            marginLeft: 55,
            borderColor: 'lightgray',
          }}
        >
          <Picker
            selectedValue={_.get(this.props, 'packageId') || packageId}
            style={{
              height: 50,
              width: 300,
            }}
            onValueChange={itemValue => {
              this.setState({ packageId: itemValue });
            }}
          >
            {(_.get(this.props.package, 'data') || []).map(val => (
              <Picker.Item
                key={val.package_id}
                label={val.package_name}
                value={val.package_id}
              />
            ))}
          </Picker>
        </View>
        <Button
          title={disabled ? 'PLEASE WAIT' : 'BOOKING'}
          disabled={disabled}
          buttonStyle={{
            borderRadius: 100 / 8,
            backgroundColor: '#CB0500',
            padding: 20,
            marginVertical: 10,
            width: Dimension.DEVICE_WIDTH - 20,
          }}
          onPress={async () => {
            this.setState({
              disabled: true,
              loadingPage: true,
            });
            if (selectPackage === false) {
              if (indexSelect < 0) {
                Alert.alert('Silahkan pilih layanan');
                this.setState({
                  disabled: false,
                  loadingPage: false,
                });
                return;
              }
            }
            const id = selectPackage
              ? _.get(this.props, 'packageId') || packageId
              : layanan[indexSelect].id_layanan;

            if (selectPackage) {
              await actions.postBooking(
                id,
                () => this.props.navigate('CodebookingScreen'),
                selectPackage,
              );
            } else {
              await actions.postBooking(
                id,
                () => this.props.navigate('CodebookingScreen'),
                selectPackage,
              );
            }
            // this.setState({
            //   disabled: false,
            //   loadingPage: false,
            // });
          }}
          containerStyle={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  layanan: state.booking.layanan,
  package: state.packageOrPromo.package,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getPackage,
      getLayanan,
      postBooking,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormBookingContainer);
