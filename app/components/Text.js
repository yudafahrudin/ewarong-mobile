import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import Fonts from '../constants/fonts';

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
});

// eslint-disable-next-line arrow-parens
const CustomText = props => {
  let fontFamily = Fonts.REGULAR;
  switch (props.fontType) {
    case 'regular': {
      fontFamily = Fonts.REGULAR;
      break;
    }
    case 'bold': {
      fontFamily = Fonts.BOLD;
      break;
    }
    case 'light': {
      fontFamily = Fonts.LIGHT;
      break;
    }
    default: {
      fontFamily = Fonts.REGULAR;
      break;
    }
  }
  return (
    <Text {...props} style={[styles.text, { fontFamily }, props.style]}>
      {props.children}
    </Text>
  );
};

CustomText.propTypes = {
  children: PropTypes.node.isRequired,
  fontType: PropTypes.string,
  style: Text.propTypes.style,
};

CustomText.defaultProps = {
  fontType: 'regular',
  style: {},
};

export default CustomText;
