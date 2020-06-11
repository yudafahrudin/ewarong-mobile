import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import Colors from '../constants/colors';

const Divider = props => (
  <View
    style={[
      { height: props.height || 1, backgroundColor: props.color || Colors.DIVIDER },
      props.style,
    ]}
  />
);

Divider.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string,
  style: ViewPropTypes.style,
};

Divider.defaultProps = {
  height: 1,
  color: null,
  style: {},
};

export default Divider;
