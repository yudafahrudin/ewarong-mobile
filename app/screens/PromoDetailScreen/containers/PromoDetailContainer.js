import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Dimension from '../../../constants/dimensions';

const list = [
  {
    name: 'Promo Murah',
    color: '#024A74',
  },
  {
    name: 'Promo Lab',
    color: '#779999',
  },
  {
    name: 'Promo booking',
    color: '#CE0087',
  },
  {
    name: 'Promo Member',
    color: '#BDB35A',
  },
];

const image = require('../../../assets/kanker.jpg');

class PromoDetailContainer extends Component {
  state = {};

  render() {
    const { title, imageUrl, content } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 20,
          width: Dimension.DEVICE_WIDTH,
        }}
      >
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{ width: Dimension.DEVICE_WIDTH - 40, height: 170 }}
        />
        <Text style={{ fontSize: 24, paddingVertical: 20, fontWeight: 'bold' }}>
          {title}
        </Text>
        <Text style={{ fontSize: 17 }}>{content}</Text>
      </View>
    );
  }
}

export default PromoDetailContainer;
