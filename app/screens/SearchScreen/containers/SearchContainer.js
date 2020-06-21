import React, {Component} from 'react';
import {View, ScrollView, Text, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Button, Icon, Input} from 'react-native-elements';
import _ from 'lodash';
import {getAllDistricts, setParams, getEwarong} from '../../../actions/ewarong';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class SearchContainer extends Component {
  state = {
    searchname: null,
    district_id: null,
    village_id: null,
    index: 0,
    routes: [
      {key: 'first', title: 'Cari dengan Nama'},
      {key: 'second', title: 'Cari Lokasi'},
    ],
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

  setParameters() {
    const {actions, navigate, filters} = this.props;
    actions.setParams({
      ...filters,
      showRadius: true,
      usemylocation: true,
    });
    navigate('HomeScreen');
  }

  async removeParameters() {
    const {actions, navigate, filters} = this.props;
    actions.setParams({
      ...filters,
      showRadius: false,
      usemylocation: false,
      villagefilter: null,
      districtfilter: null,
    });
    await actions.getEwarong();
    navigate('HomeScreen');
  }
  async searchByDistrict() {
    const {village_id, district_id} = this.state;
    const {actions, navigate, filters} = this.props;
    if (village_id == null && district_id == null) {
      Alert.alert('Pilih Lokasi', 'Pilih salah satu kecamatan atau dusun');
    } else {
      actions.setParams({
        ...filters,
        usemylocation: false,
        villagefilter: village_id,
        districtfilter: district_id,
      });
      await actions.getEwarong();
      navigate('HomeScreen');
    }
  }

  async searchByName() {
    const {searchname} = this.state;
    const {actions, navigate, filters} = this.props;
    actions.setParams({
      ...filters,
      searchname,
    });
    await actions.getEwarong();
    navigate('HomeScreen');
  }

  async deleteSearchByName() {
    const {actions, navigate, filters} = this.props;
    actions.setParams({
      ...filters,
      searchname: null,
    });
    await actions.getEwarong();
    navigate('HomeScreen');
  }

  onSearchByName = (searchname) => {
    this.setState({
      searchname,
    });
  };

  firstRoute = () => {
    const {searchname} = this.props.filters;
    return (
      <View style={{flex: 1}}>
        <Input
          placeholder="Cari Nama Ewarong"
          autoCapitalize="none"
          keyboardAppearance="light"
          defaultValue={searchname}
          autoFocus={false}
          autoCorrect={false}
          returnKeyType="next"
          onChangeText={(val) => this.onSearchByName(val)}
          onSubmitEditing={() => {
            this.name.focus();
          }}
        />
        <Button
          title={'CARI'}
          onPress={() => this.searchByName()}
          buttonStyle={{
            width: Dimension.DEVICE_WIDTH - 20,
            margin: 10,
          }}
        />
        <Button
          title={'HAPUS PENCARIAN'}
          onPress={() => this.deleteSearchByName()}
          buttonStyle={{
            width: Dimension.DEVICE_WIDTH - 20,
            backgroundColor: Colors.REDBLACK,
            margin: 10,
            marginTop: 0,
          }}
        />
      </View>
    );
  };

  secondRoute = () => {
    const {district_id, village_id} = this.state;
    const {districts, villages} = this.props.alldistricts;
    const district_conv = districts ? Object.values(districts) : [];
    const villages_conv = villages ? Object.values(villages) : [];
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {district_conv ? (
          <Picker
            selectedValue={district_id}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValueDistricts(itemValue)
            }>
            <Picker.Item key={-1} label={'Pilih Kecamatan'} value={0} />
            {district_conv.map((val, key) => {
              return <Picker.Item key={key} label={val.name} value={val.id} />;
            })}
          </Picker>
        ) : null}
        {villages_conv ? (
          <Picker
            selectedValue={village_id}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValueVillages(itemValue)
            }>
            <Picker.Item key={-1} label={'Pilih Dusun'} value={0} />
            {villages_conv.map((val, key) => {
              return <Picker.Item key={key} label={val.name} value={val.id} />;
            })}
          </Picker>
        ) : null}

        <Button
          title={'CARI BERDASARKAN DAERAH'}
          onPress={() => this.searchByDistrict()}
          buttonStyle={{
            width: Dimension.DEVICE_WIDTH - 20,
            margin: 10,
          }}
        />
        <Button
          title={'GUNAKAN LOKASI SAYA'}
          onPress={() => this.setParameters()}
          buttonStyle={{
            width: Dimension.DEVICE_WIDTH - 20,
            marginTop: 0,
            margin: 10,
          }}
        />
        <Button
          title={'HAPUS'}
          onPress={() => this.removeParameters()}
          buttonStyle={{
            width: Dimension.DEVICE_WIDTH - 20,
            margin: 10,
            marginTop: 0,
            backgroundColor: Colors.REDBLACK,
          }}
        />
      </View>
    );
  };

  setIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const {index, routes} = this.state;

    return (
      <ScrollView style={{backgroundColor: '#ececec'}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return this.firstRoute();
              case 'second':
                return this.secondRoute();
              default:
                return null;
            }
          }}
          onIndexChange={this.setIndex}
          initialLayout={{
            width: Dimension.DEVICE_WIDTH,
          }}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  filters: state.ewarong.filters,
  alldistricts: state.ewarong.alldistricts,
  filters: state.ewarong.filters,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getAllDistricts,
      setParams,
      getEwarong,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
