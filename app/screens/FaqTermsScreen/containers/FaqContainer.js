import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Dimension from '../../../constants/dimensions';

const list = [
  {
    q: 'question ?',
    a: 'answer',
  },
  {
    q: 'question ?',
    a: 'answer',
  },
  {
    q: 'question ?',
    a: 'answer',
  },
];

class FaqContainer extends Component {
  state = {};

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#ececec' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 10,
            width: Dimension.DEVICE_WIDTH,
          }}
        >
          {list.map((l, i) => (
            <TouchableOpacity
              key={i}
              style={{
                width: Dimension.DEVICE_WIDTH - 20,
                borderRadius: 100 / 11,
                padding: 10,
                margin: 10,
                marginTop: 10,
                backgroundColor: 'white',
              }}
            >
              <Text style={{ fontSize: 20 }}>{l.q}</Text>
              <Text style={{ fontSize: 15 }}>{l.a}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default FaqContainer;
