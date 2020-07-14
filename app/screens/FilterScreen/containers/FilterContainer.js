import React, {Component} from 'react';
import {View, ScrollView, Text, Picker} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';
import moment from 'moment';
import {getAllItems, getEwarong, setParams} from '../../../actions/ewarong';
import Colors from '../../../constants/colors';
import Dimension from '../../../constants/dimensions';

class FilterContainer extends Component {
  state = {
    checked: [],
    showDate: false,
    showDateClose: false,
    timeShow: null,
    timeClose: null,
  };

  async componentDidMount() {
    const {actions, filters} = this.props;
    if (filters.itemfilter.length > 0) {
      this.setState({
        checked: filters.itemfilter,
      });
    }
    if (filters.timefilter) {
      this.setState({
        timeShow: filters.timefilter,
      });
    }
    if (filters.timefilterClose) {
      this.setState({
        timeClose: filters.timefilterClose,
      });
    }
    await actions.getAllItems();
  }

  setItem(id) {
    const {checked} = this.state;
    this.setState({
      checked: [...checked, id],
    });
  }

  removeItem(id) {
    const {checked} = this.state;
    let filtering = checked.filter((val) => val != id);
    this.setState({
      checked: filtering,
    });
  }

  showTimepicker() {
    const {showDate} = this.state;
    this.setState({
      showDate: !showDate,
    });
  }

  showTimepickerClose() {
    const {showDateClose} = this.state;
    this.setState({
      showDateClose: !showDateClose,
    });
  }

  onChange(value) {
    const {showDate} = this.state;
    if (value.type == 'set') {
      this.setState({
        timeShow: moment(value.nativeEvent.timestamp).format('HH:mm'),
        showDate: !showDate,
      });
    }
    this.setState({
      showDate: !showDate,
    });
  }

  onChangeClose(value) {
    const {showDateClose} = this.state;
    if (value.type == 'set') {
      this.setState({
        timeClose: moment(value.nativeEvent.timestamp).format('HH:mm'),
        showDateClose: !showDateClose,
      });
    }
    this.setState({
      showDateClose: !showDateClose,
    });
  }

  async setParameters() {
    const {checked, timeShow, timeClose} = this.state;
    const {actions, navigate, filters} = this.props;
    actions.setParams({
      ...filters,
      timefilterClose: timeClose ? timeClose : null,
      timefilter: timeShow ? timeShow : null,
      itemfilter: checked,
    });
    await actions.getEwarong();
    navigate('HomeScreen');
  }

  async removeFIlter() {
    const {actions, navigate, filters} = this.props;
    actions.setParams({
      ...filters,
      timefilterClose: null,
      timefilter: null,
      itemfilter: [],
    });
    await actions.getEwarong();
    navigate('HomeScreen');
  }

  render() {
    const {allItems} = this.props;
    const {checked, timeShow, timeClose, showDate, showDateClose} = this.state;
    console.log(this.state);
    return (
      <ScrollView style={{backgroundColor: '#ececec'}}>
        <View
          style={{paddingTop: 20, flex: 1, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text
              style={{
                padding: 10,
                borderWidth: 0,
                marginRight: 20,
                color: Colors.DARK_GREY,
              }}>
              {timeShow ? timeShow : 'Pilih Jam Buka'}
            </Text>
            <Button
              buttonStyle={{
                width: 100,
              }}
              onPress={() => this.showTimepicker()}
              title="Buka Jam"
            />
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text
              style={{
                padding: 10,
                borderWidth: 0,
                marginRight: 20,
                color: Colors.DARK_GREY,
              }}>
              {timeClose ? timeClose : 'Pilih Jam Tutup'}
            </Text>
            <Button
              buttonStyle={{
                width: 100,
              }}
              onPress={() => this.showTimepickerClose()}
              title="Tutup Jam"
            />
          </View>
          {showDate ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={(val) => this.onChange(val)}
            />
          ) : null}
          {showDateClose ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={(val) => this.onChangeClose(val)}
            />
          ) : null}
          {allItems
            ? allItems.map((val, key) => (
                <CheckBox
                  key={key}
                  title={val.nama}
                  checkedIcon={<Icon name="check" size={18} />}
                  uncheckedIcon={<Icon name="square-o" size={18} />}
                  checked={checked.includes(val.id)}
                  onPress={() => {
                    if (checked.includes(val.id)) {
                      this.removeItem(val.id);
                    } else {
                      this.setItem(val.id);
                    }
                  }}
                />
              ))
            : null}
          <Button
            title={'TERAPKAN FILTER'}
            onPress={() => this.setParameters()}
            buttonStyle={{
              width: Dimension.DEVICE_WIDTH - 20,
              margin: 10,
            }}
          />
          <Button
            title={'HAPUS FILTER'}
            onPress={() => this.removeFIlter()}
            buttonStyle={{
              backgroundColor: Colors.RED,
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
  allItems: state.ewarong.allItems,
  filters: state.ewarong.filters,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getAllItems,
      setParams,
      getEwarong,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
