/* eslint-disable import/named */
import React, {Component} from 'react';
import {
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListItem, Text, Badge, Button} from 'react-native-elements';
import _ from 'lodash';
import {orders, getEwarong, confirmEwarong} from '../../../actions/ewarong';
import Dimension from '../../../constants/dimensions';
import Colors from '../../../constants/colors';
import {TabView} from 'react-native-tab-view';

class EwarongListContainer extends Component {
  state = {
    orders: [],
    modalVisible: false,
    ewarong: null,
    disabled: false,
    index: 0,
    routes: [
      {key: 'ewarong_pending', title: 'Pending'},
      {key: 'ewarong_active', title: 'Aktif'},
    ],
  };

  async componentDidMount() {
    const {actions} = this.props;
    await actions.getEwarong(true);
  }

  keyExtractor = (item, index) => index.toString();

  getColor = (color) => {
    if (color == 'PENDING') {
      return 'primary';
    }
    if (color == 'ACTIVE') {
      return 'success';
    }
  };

  openMAPS = (label = 'Kios', lat, lang) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lang}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  async confirmEwarong(params) {
    const {navigate, actions} = this.props;
    await actions.confirmEwarong(params);
    await actions.getEwarong(true);
    navigate('EwarongListScreen');
  }

  renderItem = (props) => {
    const {item, user} = props;
    return (
      <ListItem
        title={item.nama_kios}
        // onPress={() => this.navigateDetail(item)}
        titleStyle={{fontSize: 18, fontWeight: 'bold'}}
        subtitle={
          <View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 2}}>
                <Text>Lokasi : {item.lokasi}</Text>
                <Text>Telp : {item.telp}</Text>
              </View>
              <View style={{flex: 1}}>
                <Badge
                  value={item.status}
                  status={this.getColor(item.status)}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button
                title={'BUKA'}
                onPress={() =>
                  this.openMAPS(item.nama_kios, item.latitude, item.longitude)
                }
                buttonStyle={{
                  width: Dimension.DEVICE_WIDTH / 4,
                  margin: 10,
                  marginLeft: 0,
                }}
              />
              {item.status != 'ACTIVE' ? (
                <Button
                  title={'KONFIRMASI'}
                  onPress={() =>
                    this.confirmEwarong({
                      ewarong_id: item.id,
                      status: 'ACTIVE',
                    })
                  }
                  buttonStyle={{
                    backgroundColor: Colors.GREEN,
                    width: Dimension.DEVICE_WIDTH / 3.2,
                    margin: 10,
                    marginLeft: 0,
                  }}
                />
              ) : null}
            </View>
          </View>
        }
        bottomDivider
        chevron
      />
    );
  };

  navigateDetail = (item) => {
    const {navigate} = this.props;
    setTimeout(() => navigate('OrderDetailScreen', {detailOrder: item}), 0);
  };

  firstRoute = () => {
    const {ewarongs} = this.props;
    const filterActive = ewarongs.filter((val) => val.status == 'PENDING');
    console.log('first', this.props);
    return (
      <View>
        {ewarongs ? (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              dataOrders={orders}
              data={filterActive}
              renderItem={this.renderItem}
            />
          </View>
        ) : null}
      </View>
    );
  };

  secondRoute = () => {
    const {ewarongs} = this.props;
    const filterActive = ewarongs.filter((val) => val.status == 'ACTIVE');
    console.log('first', this.props);
    return (
      <View>
        {ewarongs ? (
          <View>
            <FlatList
              keyExtractor={this.keyExtractor}
              dataOrders={orders}
              data={filterActive}
              renderItem={this.renderItem}
            />
          </View>
        ) : null}
      </View>
    );
  };

  setIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const {navigate, ewarongs, user} = this.props;
    const {index, orders, routes, disabled, modalVisible} = this.state;
    return (
      <View
        style={{
          flex: 1,
          width: Dimension.DEVICE_WIDTH,
        }}>
        <TabView
          navigationState={{index, routes}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'ewarong_pending':
                return this.firstRoute();
              case 'ewarong_active':
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
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  ewarongs: state.ewarong.ewarong,
  user: state.session.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      orders,
      getEwarong,
      confirmEwarong,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EwarongListContainer);
