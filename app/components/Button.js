import React from 'react';
import { StyleSheet, Dimensions, ViewPropTypes } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  button: {
    borderRadius: 100 / 10,
    width: DEVICE_WIDTH,
  },
});

const ButtonComponent = props => (
  <Button
    titleStyle={props.style}
    buttonStyle={[styles.button, props.style]}
    {...props}
    title={props.title || props.children}
  />
);

ButtonComponent.propTypes = {
  title: PropTypes.string,
  style: ViewPropTypes.style,
};

ButtonComponent.defaultProps = {
  style: {},
  title: '',
};

export default ButtonComponent;
