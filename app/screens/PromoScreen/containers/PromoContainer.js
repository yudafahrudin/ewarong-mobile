import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import randomColor from 'randomcolor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class PromoContainer extends Component {
  state = {};

  render() {
    const data = _.get(this.props.promo, 'data');
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
          {data ? (
            data.map((l, i) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigate('PromoDetailScreen', {
                    promoTitle: l.promotion_name,
                    imageUrl: `${l.image_link}`,
                    content: l.content,
                  })
                }
                key={i}
                style={{
                  width: Dimension.DEVICE_WIDTH - 20,
                  height: 150,
                  borderRadius: 100 / 11,
                  margin: 10,
                  marginTop: 10,
                  backgroundColor: randomColor(),
                }}
              >
                <ImageBackground
                  style={{ height: 150, width: Dimension.DEVICE_WIDTH - 20 }}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 100 / 11 }}
                  source={{ uri: `${l.image_link}` }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      position: 'absolute',
                      bottom: 10,
                      left: 0,
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: Colors.RED,
                    }}
                  >
                    {l.promotion_name}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ))
          ) : (
            <Text> Promo Kosong</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  promo: state.packageOrPromo.promo,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromoContainer);
