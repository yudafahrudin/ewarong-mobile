/* eslint-disable arrow-parens */
import React, {Component} from 'react';
import FilterContainer from './containers/FilterContainer';

class FilterScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Filter Ewarong',
    headerStyle: {
      backgroundColor: '#FD6A00',
    },
    headerTintColor: '#fff',
  });

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen);
  };

  render() {
    return (
      <FilterContainer
        navigation={this.props.navigation}
        navigate={this.navigateTo}
      />
    );
  }
}

export default FilterScreen;
