import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Dimension from '../../../constants/dimensions';

const list = [
  {
    name: 'Pemberitahuan Hasil Lab',
    subtitle: '20-02-2019',
  },
  {
    name: 'Pendaftaran Antrian',
    subtitle: '20-02-2019',
  },
];

class HistoryNotificationContainer extends Component {
  state = {};

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#ececec' }}>
        <View
          style={{
            flex: 1,
            borderStartColor: ' red',
            width: Dimension.DEVICE_WIDTH,
          }}
        >
          {list.map((l, i) => (
            <ListItem
              key={i}
              title={l.name}
              titleStyle={{ fontSize: 20 }}
              containerStyle={{ borderBottomWidth: 1 }}
              onPress={() =>
                this.props.navigate('HistoryNotificationDetailSceen')
              }
              subtitle={l.subtitle}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default HistoryNotificationContainer;
