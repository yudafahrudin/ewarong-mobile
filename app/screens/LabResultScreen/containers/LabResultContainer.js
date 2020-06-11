import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Dimension from '../../../constants/dimensions';
import { getPasienLab } from '../../../actions/booking';
// const idCard = require('../../../assets/id-card.jpg');
// const bg1 = require('../../../assets/background-1.jpg');

const list = [
  {
    name: 'Hasil Lab - Kode Pemeriksaan',
    register: '20-02-2019',
    accepted: '20-02-2019',
  },
  {
    name: 'Hasil Lab - Kode Pemeriksaan',
    register: '20-02-2019',
    accepted: '20-02-2019',
  },
  {
    name: 'Hasil Lab - Kode Pemeriksaan',
    register: '20-02-2019',
    accepted: '20-02-2019',
  },
  {
    name: 'Hasil Lab - Kode Pemeriksaan',
    register: '20-02-2019',
    accepted: '20-02-2019',
  },
];

class LabResultContainer extends Component {
  state = {};

  async componentDidMount() {
    const { actions } = this.props;
    await actions.getPasienLab();
  }

  render() {
    const data = _.get(this.props.hasilLab, 'data') || [];
    return (
      <ScrollView style={{ backgroundColor: '#ececec' }}>
        <View
          style={{
            flex: 1,
            borderStartColor: ' red',
            width: Dimension.DEVICE_WIDTH,
          }}
        >
          {data.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 35,
              }}
            >
              <Text style={{ fontSize: 18 }}>Data hasil lab belum ada</Text>
            </View>
          )}
          {data.map((l, i) => (
            <ListItem
              key={i}
              title={`Hasil LAB - ${l.reg_no}`}
              titleStyle={{ fontSize: 20, color: 'black' }}
              onPress={() =>
                this.props.navigate('LabDetailScreen', {
                  regNo: `${l.reg_no}`,
                  regDate: `${l.reg_date}`,
                })
              }
              containerStyle={{ borderBottomWidth: 1 }}
              subtitle={
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, fontSize: 12 }}>
                    {moment(l.reg_date).format('D MMMM YYYY')}
                  </Text>
                </View>
              }
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  hasilLab: state.booking.hasilLab,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getPasienLab,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LabResultContainer);
