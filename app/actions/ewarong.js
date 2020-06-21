import api from '../services/api';
import EndPoints from '../constants/endPoints';
import {
  EWARONG,
  EWARONG_DISTRICTS,
  EWARONG_DISTRICTS_ID,
  EWARONG_VILLAGES,
  EWARONG_ITEMS,
  EWARONG_PARAMS,
  EWARONG_MYORDERS,
} from '../constants/actionTypes';
import {Alert} from 'react-native';

export const getEwarong = () => (dispatch, getState) => {
  const params = {};
  const {filters} = getState().ewarong;

  if (filters) {
    if (filters.searchname) {
      params['searchname'] = filters.searchname;
    }
    if (filters.timefilter) {
      params['time'] = filters.timefilter;
    }
    if (filters.itemfilter.length) {
      params['items'] = filters.itemfilter;
    }
    if (filters.usemylocation) {
      params['usemylocation'] = filters.usemylocation;
      params['latitude'] = filters.latitude;
      params['longitude'] = filters.longitude;
      params['km'] = filters.rangekm;
    } else {
      if (filters.villagefilter) {
        params['village_id'] = filters.villagefilter;
      }
      if (filters.districtfilter) {
        params['district_id'] = filters.districtfilter;
      }
    }
  }

  return api(getState, dispatch, EndPoints.ewarong, 'get', params).then(
    (response) => {
      const {data} = response;
      dispatch({
        type: EWARONG,
        payload: data.data,
      });
    },
  );
};

export const getAllDistricts = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.alldistricts).then((response) => {
    const {data} = response;
    dispatch({
      type: EWARONG_DISTRICTS,
      payload: data.data,
    });
  });
};

export const setDistrictId = (id) => (dispatch, getState) => {
  return dispatch({
    type: EWARONG_DISTRICTS_ID,
    payload: id,
  });
};

export const getAllVillages = (id) => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.allvillages, 'get', {
    district_id: id,
  }).then((response) => {
    console.log('response get villages', response);
    const {data} = response;
    dispatch({
      type: EWARONG_VILLAGES,
      payload: data.data,
    });
  });
};
export const getAllItems = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.allitems).then((response) => {
    const {data} = response;
    dispatch({
      type: EWARONG_ITEMS,
      payload: data.data,
    });
  });
};

export const setParams = (params) => (dispatch, getState) => {
  return dispatch({type: EWARONG_PARAMS, payload: params});
};

export const orders = (params, navigateSucces) => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.orders, 'post', params).then(
    (response) => {
      const {data} = response;
      console.log('response inside orders', response);
      const {message, status} = data;
      if (status == 'success') {
        Alert.alert('Berhasil', 'Berhasil menambahkan pesanan anda', [
          {text: 'OK', onPress: () => navigateSucces()},
        ]);
      } else {
        Alert.alert('Error', message);
      }
    },
  );
};

export const getMyOrders = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.myorders).then((response) => {
    const {data} = response;
    dispatch({
      type: EWARONG_MYORDERS,
      payload: data.data,
    });
  });
};
