import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Dimension from '../../../constants/dimensions';
import { paddingClass, marginClass } from '../../../constants/styles';

const image = require('../../../assets/lab.jpg');

class HistoryNotificationDetailContainer extends Component {
  state = {};

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#ececec' }}>
        <View
          style={{
            flex: 1,
            borderStartColor: ' red',
            backgroundColor: 'white',
            width: Dimension.DEVICE_WIDTH - 20,
            height: Dimension.DEVICE_HEIGT / 2.4,
            padding: paddingClass.md,
            margin: 10,
          }}
        >
          <View style={{ marginBottom: marginClass.sm }}>
            <Text>Pelanggan yth,</Text>
            <Text> </Text>
            <Text>
              Untuk hasil lab dengan kode 5562826 yang dilakukan tanggal
              20-06-2019 sudah dapat di terima
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default HistoryNotificationDetailContainer;
