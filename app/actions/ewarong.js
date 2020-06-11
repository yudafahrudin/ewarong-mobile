import api from '../services/api';
import EndPoints from '../constants/endPoints';
import {
  EWARONG,
  EWARONG_DISTRICTS_VILLAGES,
  EWARONG_ITEMS,
  EWARONG_PARAMS,
} from '../constants/actionTypes';

export const getEwarong = () => (dispatch, getState) => {
  const params = {};
  const {filters} = getState().ewarong;

  if (filters) {
    if (filters.timefilter) {
      params['time'] = filters.timefilter;
    }
    if (filters.itemfilter.length) {
      params['items'] = filters.itemfilter;
    }
  }
  console.log('APSAPDPASDP', params);
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
      type: EWARONG_DISTRICTS_VILLAGES,
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
