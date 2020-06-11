import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { paddingClass } from '../constants/styles';
import Text from './Text';
import Divider from './Divider';

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingLeft: paddingClass.md,
    marginBottom: 12,
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 18,
    marginBottom: 8,
  },
});

const Header = props => (
  <View style={styles.header}>
    <Text style={styles.headerText} fontType="bold">
      {props.title}
    </Text>
    <Divider height={3} color={Colors.YELLOW} />
  </View>
);

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: '',
};

export default Header;
