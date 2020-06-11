import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import Colors from '../constants/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH - 100,
    marginTop: 10,
    marginLeft: -10,
  },
  input: {
    fontSize: 15,
    borderBottomColor: 'white',
  },
  inputIcon: {
    fontSize: 15,
    // padding: 10,
  },
});

export default class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      placeholder,
      icon,
      iconColor,
      inputRef,
      customContainerStyle,
      customInputStyle,
    } = this.props;
    return (
      <View>
        {icon === null ? (
          <Input
            containerStyle={[styles.container, customContainerStyle]}
            inputStyle={[styles.input, customInputStyle]}
            placeholder={placeholder}
            ref={inputRef}
            {...this.props}
          />
        ) : (
          <Input
            containerStyle={[styles.container, customContainerStyle]}
            inputStyle={[styles.inputIcon, customInputStyle]}
            placeholder={placeholder}
            leftIcon={
              <Icon
                style={{ marginLeft: -15 }}
                name={icon}
                size={24}
                color={iconColor}
              />
            }
            ref={inputRef}
            {...this.props}
          />
        )}
      </View>
    );
  }
}

InputComponent.propTypes = {
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
};
InputComponent.defaultProps = {
  icon: null,
  placeholder: '',
  color: Colors.DARK_GREY,
};
