import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {logout} from '../actions/session';

const Logo = require('../assets/app_logo_3.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
  },

  profile: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  profileText: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    paddingBottom: 5,
    textAlign: 'left',
  },
  editProfile: {
    fontSize: 15,
    paddingBottom: 5,
    color: 'red',
    textAlign: 'left',
  },
  img: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  topLinks: {
    height: 140,
  },
  bottomLinks: {
    flex: 1,
    paddingTop: 20,
  },
  link: {
    flex: 1,
    fontSize: 17,
    marginLeft: 20,
    textAlign: 'left',
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  version: {
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
    color: 'gray',
  },
  logout: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    marginLeft: 20,
    fontSize: 16,
    color: 'red',
  },
});

class MenuDrawer extends Component {
  navLink(nav, text) {
    return (
      <TouchableOpacity
        style={{height: 45}}
        onPress={() => this.props.navigation.navigate(nav)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }

  navigateLogout = () => {
    const {navigation} = this.props;
    navigation.navigate('AuthLoading');
  };

  render() {
    // const { data } = this.props.user;
    const UserName = 'Yuda';
    const titleName = 'Mr.';
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topLinks}>
            <View style={styles.profile}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#024a74',
                    marginHorizontal: 10,
                  }}
                />
                <View style={styles.profileText}>
                  <Text style={styles.name}>{`${UserName}, ${titleName}`}</Text>
                  <Text
                    onPress={() =>
                      this.props.navigation.navigate('EditAccountScreen')
                    }
                    style={styles.editProfile}>
                    Edit Profile
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomLinks}>
            {/* {this.navLink('HomeScreen', 'Beranda')} */}
            {this.navLink('IdCardScreen', 'Kartu ID')}
          </View>
          <View
            style={[
              styles.bottomLinks,
              {borderTopColor: 'lightgray', borderTopWidth: 1},
            ]}>
            {this.navLink('HelpScreen', 'Bantuan')}
            {/* {this.navLink('', 'Edit Akun')} */}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              this.props.actions.logout();
              this.navigateLogout();
            }}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.session.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      logout,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuDrawer);
