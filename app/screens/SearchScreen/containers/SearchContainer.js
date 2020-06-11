import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Icon} from 'react-native-elements';
import _ from 'lodash';
import {getAllDistricts} from '../../../actions/ewarong';
import Dimension from '../../../constants/dimensions';

class SearchContainer extends Component {
  state = {
    district_id: null,
    village_id: null,
  };

  async componentDidMount() {
    const {actions} = this.props;
    await actions.getAllDistricts();
  }

  setSelectedValueDistricts(value) {
    this.setState({
      district_id: value,
    });
  }

  setSelectedValueVillages(value) {
    this.setState({
      village_id: value,
    });
  }

  render() {
    const {district_id, village_id} = this.state;
    const {districts, villages} = this.props.alldistricts;
    const district_conv = Object.values(districts);
    const villages_conv = Object.values(villages);
    return (
      <ScrollView style={{backgroundColor: '#ececec'}}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {district_conv ? (
            <Picker
              selectedValue={district_id}
              onValueChange={(itemValue, itemIndex) =>
                this.setSelectedValueDistricts(itemValue)
              }>
              {district_conv.map((val, key) => {
                return (
                  <Picker.Item key={key} label={val.name} value={val.id} />
                );
              })}
            </Picker>
          ) : null}
          {villages_conv ? (
            <Picker
              selectedValue={village_id}
              onValueChange={(itemValue, itemIndex) =>
                this.setSelectedValueVillages(itemValue)
              }>
              {villages_conv.map((val, key) => {
                return (
                  <Picker.Item key={key} label={val.name} value={val.id} />
                );
              })}
            </Picker>
          ) : null}
          <Button
            title={'GUNAKAN LOKASI SAYA'}
            buttonStyle={{
              width: Dimension.DEVICE_WIDTH - 20,
              margin: 10,
            }}
          />
          <Button
            title={'CARI BERDASARKAN DAERAH SAJA'}
            buttonStyle={{
              width: Dimension.DEVICE_WIDTH - 20,
              margin: 10,
              marginTop: 0,
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  alldistricts: state.ewarong.alldistricts,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getAllDistricts,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
