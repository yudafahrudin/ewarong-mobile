import React, {Component} from 'react';
import {View, ScrollView, Text, Alert, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Button, Icon, Input} from 'react-native-elements';
import _ from 'lodash';
import {
  getAllDistricts,
  setParams,
  getEwarong,
  searchEwarong,
} from '../../../actions/ewarong';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';

class SearchContainer extends Component {
  state = {
    searchname: null,
    district_id: null,
    village_id: null,
    villagesUses: [],
    resultSearch: [],
    afterClick: false,
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
      Alert.alert('Pilih Lokasi', 'Pilih salah satu kecamatan atau desa');
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

  onSearchByName = async (searchname) => {
    const {actions} = this.props;
    const data = await actions.searchEwarong(searchname);
    this.setState({
      resultSearch: searchname ? data.data : [],
      searchname,
    });
  };

  sortByname = (obj) => {
    return obj ? obj.sort((a, b) => (a.name > b.name ? 1 : -1)) : null;
  };

  setSelectedValueDistricts = (itemValue) => {
    const {villages} = this.props.alldistricts;
    const villagess = Object.values(villages).filter((val) => {
      if (Number(val.district_id) == Number(itemValue)) {
        return val;
      }
    });
    if (villagess.length > 0) {
      this.setState({district_id: itemValue, villagesUses: villagess});
    }
  };

  firstRoute = () => {
    const {searchname} = this.props.filters;
    const {resultSearch, afterClick} = this.state;
    return (
      <View style={{flex: 1}}>
        <Input
          placeholder="Cari Nama Ewarong"
          autoCapitalize="none"
          keyboardAppearance="light"
          defaultValue={this.state.searchname}
          autoFocus={false}
          autoCorrect={false}
          returnKeyType="next"
          onChangeText={(val) => this.onSearchByName(val)}
          ref={(input) => {
            this.namesearch = input;
          }}
        />
        {resultSearch.length ? (
          resultSearch.map((val, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                this.setState({
                  searchname: val.nama_kios,
                  resultSearch: [],
                  afterClick: true,
                });
              }}>
              <Text style={{margin: 10, marginTop: 0}}>{val.nama_kios}</Text>
            </TouchableOpacity>
          ))
        ) : this.state.searchname && !afterClick ? (
          <Text
            style={{
              margin: 10,
              width: Dimension.DEVICE_WIDTH,
              textAlign: 'center',
              marginTop: 0,
            }}>
            No result data
          </Text>
        ) : null}
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
    const {district_id, village_id, villagesUses} = this.state;
    const {districts, villages} = this.props.alldistricts;
    const district_conv = districts
      ? this.sortByname(Object.values(districts))
      : [];
    const villages_conv = villagesUses
      ? this.sortByname(Object.values(villagesUses))
      : [];

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
        {villages_conv && district_id ? (
          <Picker
            selectedValue={village_id}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValueVillages(itemValue)
            }>
            <Picker.Item key={-1} label={'Pilih Desa'} value={0} />
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
    const {index, routes, resultSearch} = this.state;
    console.log(resultSearch);
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
      searchEwarong,
      getEwarong,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
