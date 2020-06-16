/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import ProfileContainer from './containers/ProfileContainer';

class ProfileScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `PROFILE`,
    headerStyle: {
      backgroundColor: '#FD6A00',
    },
    headerTintColor: '#fff',
  });

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return <ProfileContainer navigate={this.navigateTo} />;
  }
}

export default ProfileScreen;
