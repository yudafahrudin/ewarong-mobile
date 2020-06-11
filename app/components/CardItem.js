import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  ViewPropTypes,
  Image,
  ImageBackground,
} from 'react-native';
import Colors from '../constants/colors';
import Text from './Text';

const loaderImage = require('../assets/images/bubblecoffee-loading-icon-2.png');

const CardItem = (props) => {
  const {
    title,
    titleStyle,
    descriptionStyle,
    description,
    onPress,
    style,
    imageStyle,
    containerTextStyle,
    ImageURL,
    fontType,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View
        style={[
          {
            flexDirection: 'row',
            marginTop: 15,
            marginBottom: 15,
          },
          style,
        ]}
      >
        <ImageBackground
          source={loaderImage}
          style={[
            {
              width: 75,
              height: 75,
              marginRight: 10,
            },
            imageStyle,
          ]}
        >
          <Image
            style={[{ width: 75, height: 75, borderRadius: 100 / 8 }, imageStyle]}
            source={{ uri: ImageURL }}
          />
        </ImageBackground>
        <View style={[{ justifyContent: 'center' }, containerTextStyle]}>
          <Text style={[{ color: Colors.TEXT_BLACK }, titleStyle]} fontType={fontType}>
            {title}
          </Text>
          <Text style={[{ color: Colors.TEXT_BLACK }, descriptionStyle]}>{description}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

CardItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  imageStyle: ViewPropTypes.style,
  titleStyle: ViewPropTypes.style,
  descriptionStyle: ViewPropTypes.style,
  fontType: PropTypes.string,
  ImageURL: PropTypes.string.isRequired,
  containerTextStyle: ViewPropTypes.style,
};
CardItem.defaultProps = {
  onPress: () => {},
  title: '',
  description: '',
  style: {},
  imageStyle: {},
  titleStyle: {},
  descriptionStyle: {},
  fontType: 'regular',
  containerTextStyle: {},
};

export default CardItem;
