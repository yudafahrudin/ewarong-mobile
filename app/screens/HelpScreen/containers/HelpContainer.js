import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Dimension from '../../../constants/dimensions';

const list = [
  {
    name: 'Syarat Dan Ketentuan',
    screen: 'FaqTermsScreen',
    code: 'Terms',
  },
  {
    name: 'FAQ',
    screen: 'FaqTermsScreen',
    code: 'Faq',
  },
];

class HelpContainer extends Component {
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
              onPress={() => {
                this.props.navigate(l.screen, {
                  code: l.code,
                });
              }}
              titleStyle={{ fontSize: 20 }}
              containerStyle={{ borderBottomWidth: 1 }}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default HelpContainer;
