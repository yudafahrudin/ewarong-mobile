import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import { getPasienDetailLab } from '../../../actions/booking';
import Divider from '../../../components/Divider';
import Dimension from '../../../constants/dimensions';
import { paddingClass, marginClass } from '../../../constants/styles';

const image = require('../../../assets/lab.jpg');

class LabDetailContainer extends Component {
  state = {};

  async componentDidMount() {
    const { actions } = this.props;
    await actions.getPasienDetailLab('190911000001');
  }

  render() {
    const UserName = _.get(this.props.user, 'patient_name');
    const titleName = _.get(this.props.user, 'title_name');
    const HasilLabDetail = this.props.hasilLabDetail || [];

    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            borderStartColor: ' red',
            width: Dimension.DEVICE_WIDTH,
            padding: paddingClass.md,
          }}
        >
          <View style={{ marginBottom: marginClass.sm }}>
            <Text>{`Name : ${UserName}, ${titleName}`}</Text>
            <Text>{`Kode Transaksi: ${this.props.noRegistration}`}</Text>
            <Text>
              Tanggal : {moment(this.props.noDate).format('D MMMM YYYY')}
            </Text>
          </View>
          <Divider />
          {/* <Image
            source={image}
            style={{ height: 350, width: 330 }}
            resizeMode="stretch"
          /> */}
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flex: 1, padding: 5, backgroundColor: 'red' }}>
              <Text style={{ color: '#fff' }}>{'No'}</Text>
            </View>
            <View style={{ flex: 2, padding: 5, backgroundColor: 'red' }}>
              <Text style={{ color: '#fff' }}>{'Nama Pemeriksaan'}</Text>
            </View>
            <View style={{ flex: 2, padding: 5, backgroundColor: 'red' }}>
              <Text style={{ color: '#fff' }}>{'Hasil'}</Text>
            </View>
            <View style={{ flex: 2, padding: 5, backgroundColor: 'red' }}>
              <Text style={{ color: '#fff' }}>{'Standart'}</Text>
            </View>
          </View>
          {HasilLabDetail
            ? HasilLabDetail.map((val, key) => {
                return (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, padding: 5 }}>
                      <Text>{key + 1}</Text>
                    </View>
                    <View style={{ flex: 2, padding: 5 }}>
                      <Text style={{ fontSize: 15 }}>
                        {val.test_group_name}
                      </Text>
                      <Text style={{ fontSize: 13 }}>{val.test_name}</Text>
                    </View>
                    <View style={{ flex: 2, padding: 5 }}>
                      <Text>{val.result || 'kosong'}</Text>
                    </View>
                    <View style={{ flex: 2, padding: 5 }}>
                      <Text>{val.normal_range || 'kosong'}</Text>
                    </View>
                  </View>
                );
              })
            : null}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user.data,
  hasilLabDetail: state.booking.hasilLabDetail
    ? state.booking.hasilLabDetail.data
    : [],
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getPasienDetailLab,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LabDetailContainer);
