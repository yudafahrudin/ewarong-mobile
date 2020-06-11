import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import Dimension from '../../../constants/dimensions';
import { getHistoryAntrian } from '../../../actions/booking';

class HistoryBookingContainer extends Component {
  state = {};

  async componentDidMount() {
    const { actions } = this.props;
    await actions.getHistoryAntrian();
  }

  render() {
    const data = _.get(this.props.antrian, 'data') || [];
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
              <Text style={{ fontSize: 18 }}>Data antrian belum ada</Text>
            </View>
          )}
          {data.map((l, i) => (
            <ListItem
              key={i}
              title={l.LAYANAN}
              titleStyle={{ fontSize: 20, color: 'black' }}
              containerStyle={{ borderBottomWidth: 1 }}
              onPress={() => this.props.navigate('CodebookingScreen')}
              subtitle={
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, fontSize: 12 }}>{l.D_TANGGAL}</Text>
                  <Text style={{ flex: 1, textAlign: 'right', fontSize: 12 }}>
                    {l.V_STATUS}
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
  antrian: state.booking.antrian,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getHistoryAntrian,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryBookingContainer);
