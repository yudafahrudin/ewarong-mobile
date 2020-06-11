import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Colors from '../../../constants/colors';
import Dimension from '../../../constants/dimensions';
import Button from '../../../components/Button';

class PackageDetailContainer extends Component {
  state = {};

  // eslint-disable-next-line arrow-parens
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  render() {
    const { detail, price, imageUrl } = this.props;

    return (
      <View
        style={{
          height: Dimension.DEVICE_HEIGT,
          width: Dimension.DEVICE_WIDTH,
        }}
      >
        <ScrollView>
          <View
            style={{
              alignItems: 'flex-start',
              padding: 10,
              marginBottom: 160,
              width: Dimension.DEVICE_WIDTH,
            }}
          >
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Image
                source={{ uri: `${imageUrl}` }}
                style={{
                  width: Dimension.DEVICE_WIDTH - 20,
                  height: 200,
                }}
              />
            </View>
            <Text
              style={{
                paddingHorizontal: 30,
                paddingVertical: 5,
                fontSize: 20,
                fontWeight: 'bold',
                backgroundColor: Colors.REDBLACK,
                color: Colors.WHITE,
              }}
            >
              Rp {this.numberWithCommas(price)} , -
            </Text>
            {(detail || []).map((l, i) => (
              <ListItem
                key={l.package_detail_id}
                title={l.package_detail_name}
                subtitle={l.description}
                leftIcon={
                  <Icon
                    name="radio-button-checked"
                    size={20}
                    color={Colors.REDBLACK}
                  />
                }
                subtitleStyle={{ color: 'black' }}
                containerStyle={{
                  width: Dimension.DEVICE_WIDTH - 20,
                }}
              />
            ))}
          </View>
        </ScrollView>
        <Button
          title="PILIH PAKET"
          onPress={() =>
            this.props.navigate('FormBookingScreen', {
              packageTitle: this.props.packageTitle,
              packageId: this.props.packageId,
            })
          }
          buttonStyle={{
            borderRadius: 0,
            height: 60,
            backgroundColor: Colors.YELLOWBLACK,
          }}
          containerStyle={{
            position: 'absolute',
            width: Dimension.DEVICE_WIDTH,
            bottom: 80,
          }}
        />
      </View>
    );
  }
}

export default PackageDetailContainer;
