/* eslint-disable import/named */
import React, {Component} from 'react';
import {View, FlatList, Alert, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListItem, Text, Input, Button} from 'react-native-elements';
import {LineChart} from 'react-native-chart-kit';
import _, {first, isInteger} from 'lodash';
import moment from 'moment';
import {orders, getEwarong, getMyCart} from '../../../actions/ewarong';
import Modal from 'react-native-modal';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class ReportContainer extends Component {
  state = {
    orders: [],
    modalVisible: false,
    ewarong: null,
    disabled: false,
  };

  async componentDidMount() {
    const {actions} = this.props;
    await actions.getMyCart(true);
  }

  keyExtractor = (item, index) => index.toString();

  labelYears = () => {
    let data = [];
    let i;
    for (i = 1; i <= 12; i++) {
      data.push(i);
    }
    return data;
  };

  labelDay = () => {
    let data = [];
    let i;
    for (i = 1; i <= moment().daysInMonth() - 16; i++) {
      data.push(i);
    }
    return data;
  };

  labelDay2 = () => {
    let data = [];
    let i;
    for (i = 16; i <= moment().daysInMonth(); i++) {
      data.push(i);
    }
    return data;
  };

  cartForUserAndRpk = (cartFirst, cartSecond) => {
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 20}}>
          Report Bulan Ini
        </Text>
        <LineChart
          data={{
            labels: this.labelDay(),
            datasets: [
              {
                data: [],
              },
            ],
          }}
          width={Dimension.DEVICE_WIDTH - 20} // from react-native
          height={220}
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: Colors.LIGHT_GREY,
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
          }}
        />
        <LineChart
          data={{
            labels: this.labelDay2(),
            datasets: [
              {
                data: cartSecond,
              },
            ],
          }}
          width={Dimension.DEVICE_WIDTH - 20} // from react-native
          height={220}
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: Colors.LIGHT_GREY,
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
          }}
        />
      </View>
    );
  };

  renderItem = (props) => {
    const {item, user} = props;
    console.log('item', item);
    return (
      <ListItem
        title={item.nama_kios}
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        subtitle={
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text>Jumlah Penjualan : {item.total}</Text>
            </View>
          </View>
        }
        bottomDivider
        chevron
      />
    );
  };

  cartForAdmin = (ewarongs = [], penjualan = []) => {
    const ewarongKeys = Object.keys(ewarongs);
    const ewarongArray = [];
    this.labelYears().forEach((key) => {
      ewarongArray[key] = ewarongs[key];
    });
    const filterEmpy = ewarongArray.filter((val) => isInteger(val));
    return (
      <View>
        <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 20}}>
          Report Pendaftaran Tahun Ini
        </Text>
        <LineChart
          data={{
            labels: this.labelYears(),
            datasets: [
              {
                data: filterEmpy,
              },
            ],
          }}
          width={Dimension.DEVICE_WIDTH - 20} // from react-native
          height={220}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: Colors.LIGHT_GREY,
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            marginTop: 20,
            marginBottom: 20,
          }}>
          List Penjualan Kios Tahun ini
        </Text>
        <FlatList
          keyExtractor={this.keyExtractor}
          dataOrders={orders}
          data={penjualan}
          renderItem={this.renderItem}
        />
      </View>
    );
  };

  render() {
    const {navigate, chart, myorders, user} = this.props;
    let data_satu = [];
    let data_dua = [];
    let chartAdmin = [];
    let ewarongdata = [];
    let penjualandata = [];

    if (user.access_type != 'admin') {
      const arrayChart = Object.values(chart);
      if (arrayChart.length > 0) {
        arrayChart.forEach((element, index) => {
          if (index + 1 < 16) {
            data_satu.push(element / 1000);
          } else {
            data_dua.push(element / 1000);
          }
        });
      }
    } else {
      if (chart) {
        const {ewarongs, penjualan} = chart;
        ewarongdata = ewarongs;
        penjualandata = penjualan;
      }
    }

    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          width: Dimension.DEVICE_WIDTH,
        }}>
        {user.access_type != 'admin'
          ? this.cartForUserAndRpk(data_satu, data_dua)
          : null}
        {user.access_type == 'admin'
          ? this.cartForAdmin(ewarongdata, penjualandata)
          : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  myorders: state.ewarong.myorders,
  chart: state.ewarong.chart,
  user: state.session.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      orders,
      getEwarong,
      getMyCart,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
