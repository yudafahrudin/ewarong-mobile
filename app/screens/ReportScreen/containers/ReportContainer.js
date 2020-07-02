/* eslint-disable import/named */
import React, {Component} from 'react';
import {View, FlatList, Alert, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListItem, Text, Input, Button} from 'react-native-elements';
import {LineChart} from 'react-native-chart-kit';
import _ from 'lodash';
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
    await actions.getMyCart();
    // this.labelDay();
  }

  keyExtractor = (item, index) => index.toString();

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

  render() {
    const {navigate, chart, myorders} = this.props;
    const arrayChart = Object.values(chart);
    let cartFirst = [];
    let cartSecond = [];
    if (arrayChart.length > 0) {
      arrayChart.forEach((element, index) => {
        if (index + 1 < 16) {
          cartFirst.push(element / 1000);
        } else {
          cartSecond.push(element / 1000);
        }
      });
    }

    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          width: Dimension.DEVICE_WIDTH,
        }}>
        <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 20}}>
          Laporan Belanja Bulan Ini
        </Text>
        <LineChart
          data={{
            labels: this.labelDay(),
            datasets: [
              {
                data: cartFirst,
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
  }
}

const mapStateToProps = (state) => ({
  myorders: state.ewarong.myorders,
  chart: state.ewarong.chart,
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
