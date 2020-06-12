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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
  },

  profile: {
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
    height: 70,
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

  navigateScreen = (screen) => {
    const {navigation} = this.props;
    console.log(this.props);
    navigation.navigate(screen);
  };

  render() {
    const {user} = this.props.session;
    const UserName = user ? 'Sudah login' : 'Selamat datang';
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
                  <Text style={styles.name}>{`${UserName}`}</Text>
                  {user ? (
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate('EditAccountScreen')
                      }
                      style={styles.editProfile}>
                      Edit Profile
                    </Text>
                  ) : (
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate('EditAccountScreen')
                      }
                      style={styles.editProfile}>
                      Daftar sekarang
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomLinks}>
            {this.navLink('HomeScreen', 'Home')}
          </View>
          <View
            style={[
              styles.bottomLinks,
              {borderTopColor: 'lightgray', borderTopWidth: 1},
            ]}>
            {this.navLink('HelpScreen', 'Bantuan')}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              this.navigateScreen('Login');
            }}>
            <Text style={styles.logout}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
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
