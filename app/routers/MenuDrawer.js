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
import Icon from 'react-native-vector-icons/FontAwesome';
import EndPoint from '../constants/endPoints';

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
    fontSize: 16,
    marginHorizontal: 20,
    color: 'red',
  },
});

class MenuDrawer extends Component {
  navLink(nav, text, icon = 'home') {
    return (
      <TouchableOpacity
        style={{padding: 20, flexDirection: 'row'}}
        onPress={() => this.props.navigation.navigate(nav, {header: text})}>
        <Icon name={icon} size={25} color="black" />
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }

  navigateScreen = (screen) => {
    const {navigation} = this.props;
    navigation.navigate(screen);
  };

  logoutSession() {
    const {actions} = this.props;
    actions.logout();
    this.navigateScreen('AuthLoading');
  }

  render() {
    const {user} = this.props.session;
    const UserName = user ? user.name : 'Selamat datang';

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
                  }}>
                  {user ? (
                    <Image
                      source={{
                        uri: `${EndPoint.BASE_URL}${EndPoint.profileImageUrl}/${user.image_url}`,
                      }}
                      style={{width: 50, height: 50, borderRadius: 50}}
                    />
                  ) : null}
                </View>

                <View style={styles.profileText}>
                  <Text style={styles.name}>{`${UserName}`}</Text>
                  {user ? (
                    <Text
                      onPress={() =>
                        this.props.navigation.navigate('ProfileScreen')
                      }
                      style={styles.editProfile}>
                      Edit Profile
                    </Text>
                  ) : (
                    <Text
                      onPress={() => this.props.navigation.navigate('Login')}
                      style={styles.editProfile}>
                      Daftar sekarang
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          {user ? (
            <View style={styles.bottomLinks}>
              {this.navLink('ProfileScreen', 'Profil', 'user')}
            </View>
          ) : null}
          {user ? (
            user.access_type == 'umum' || user.access_type == 'superadmin' ? (
              <View
                style={[
                  styles.bottomLinks,
                  {borderTopColor: 'lightgray', borderTopWidth: 1},
                ]}>
                {this.navLink(
                  'OrderListScreen',
                  'Pesananku',
                  'shopping-basket',
                )}
              </View>
            ) : null
          ) : null}
          {user ? (
            user.access_type == 'rpk' || user.access_type == 'superadmin' ? (
              <View
                style={[
                  styles.bottomLinks,
                  {borderTopColor: 'lightgray', borderTopWidth: 1},
                ]}>
                {this.navLink(
                  'OrderListScreen',
                  'Penjualan',
                  'shopping-basket',
                )}
              </View>
            ) : null
          ) : null}
          {user ? (
            user.access_type == 'admin' || user.access_type == 'superadmin' ? (
              <View
                style={[
                  styles.bottomLinks,
                  {borderTopColor: 'lightgray', borderTopWidth: 1},
                ]}>
                {this.navLink('EwarongListScreen', 'Survei Ewarong', 'map')}
              </View>
            ) : null
          ) : null}
          {user ? (
            user.access_type == 'admin' || user.access_type == 'superadmin' ? (
              <View
                style={[
                  styles.bottomLinks,
                  {borderTopColor: 'lightgray', borderTopWidth: 1},
                ]}>
                {this.navLink('ReportScreen', 'Report Ewarong', 'area-chart')}
              </View>
            ) : null
          ) : null}
          {user ? (
            user.access_type == 'rpk' ? (
              <View
                style={[
                  styles.bottomLinks,
                  {borderTopColor: 'lightgray', borderTopWidth: 1},
                ]}>
                {this.navLink('ReportScreen', 'Report Penjualan', 'area-chart')}
              </View>
            ) : null
          ) : null}
          {user ? (
            user.access_type == 'umum' || user.access_type == 'superadmin' ? (
              <View
                style={[
                  styles.bottomLinks,
                  {borderTopColor: 'lightgray', borderTopWidth: 1},
                ]}>
                {this.navLink('ReportScreen', 'Report Belanja', 'area-chart')}
              </View>
            ) : null
          ) : null}
          <View
            style={[
              styles.bottomLinks,
              {borderTopColor: 'lightgray', borderTopWidth: 1},
            ]}>
            {this.navLink('AboutScreen', 'Help', 'question-circle')}
          </View>
          <View
            style={[
              styles.bottomLinks,
              {borderTopColor: 'lightgray', borderTopWidth: 1},
            ]}>
            {this.navLink('AboutScreen', 'Tentang', 'info')}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          {user ? (
            <TouchableOpacity
              onPress={() => {
                this.logoutSession();
              }}>
              <Text style={styles.logout}>LOGOUT</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                this.navigateScreen('Login');
              }}>
              <Text style={styles.logout}>LOGIN</Text>
            </TouchableOpacity>
          )}
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
