import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Button from '../../../components/Button';
import Colors from '../../../constants/colors';
import Dimension from '../../../constants/dimensions';
import { getPackage } from '../../../actions/packagePromo';

class PackageContainer extends Component {
  state = {};

  componentDidMount() {
    const { actions } = this.props;
    actions.getPackage();
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  render() {
    const data = _.get(this.props.package, 'data');
    return (
      <ScrollView style={{ backgroundColor: '#ececec' }}>
        <View
          style={{
            flex: 1,
            marginTop: 10,
            width: Dimension.DEVICE_WIDTH,
          }}
        >
          {data ? (
            data.map(value => (
              <TouchableWithoutFeedback
                key={value.package_id}
                onPress={() =>
                  this.props.navigate('PackageDetailScreen', {
                    packageTitle: value.package_name,
                    packageId: value.package_id,
                    imageUrl: value.image_link,
                    price: value.price,
                    outletId: value.outlet_id,
                    detail: value.detail,
                  })
                }
              >
                <View
                  key={value.package_id}
                  style={{
                    width: Dimension.DEVICE_WIDTH - 20,
                    borderRadius: 100 / 11,
                    padding: 10,
                    margin: 10,
                    marginTop: 10,
                    backgroundColor: 'white',
                  }}
                >
                  <Text
                    style={{
                      position: 'absolute',
                      fontSize: 20,
                      color: 'white',
                      marginBottom: 10,
                      top: 10,
                      backgroundColor: Colors.RED,
                      padding: 10,
                      paddingVertical: 5,
                    }}
                  >
                    {value.package_name}
                  </Text>
                  <View style={{ marginTop: 50 }}>
                    {value.detail.map(valDetail => (
                      <Text key={valDetail.package_detail_id}>
                        {' '}
                        {valDetail.package_detail_name}{' '}
                      </Text>
                    ))}
                  </View>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 25,
                        flex: 2,
                        fontWeight: 'bold',
                        color: Colors.RED,
                      }}
                    >
                      Rp {this.numberWithCommas(value.price)} , -
                    </Text>
                    <Button
                      title="Pilih"
                      onPress={() =>
                        this.props.navigate('FormBookingScreen', {
                          packageTitle: value.package_name,
                          packageId: value.package_id,
                          disableFeature: true,
                        })
                      }
                      style={{
                        width: 100,
                        backgroundColor: Colors.YELLOWBLACK,
                        alignSelf: 'flex-end',
                        right: 0,
                      }}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))
          ) : (
            <Text style={{ alignContent: 'center', margin: 20 }}>
              Paket Kosong
            </Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  package: state.packageOrPromo.package,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getPackage }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer);
