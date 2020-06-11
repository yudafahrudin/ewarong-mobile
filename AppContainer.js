import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainNav from './app/routers/MainNav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppContainer = () => (
  <View style={styles.container}>
    <MainNav />
  </View>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
