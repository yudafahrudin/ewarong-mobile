/* eslint-disable import/prefer-default-export */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable arrow-parens */
import { Alert } from 'react-native';
import api from '../services/api';
import EndPoints from '../constants/endPoints';
import { PROFILE, SUCCES } from '../constants/actionTypes';

export const getProfile = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.profile).then(response => {
    const { data } = response;
    dispatch({
      type: PROFILE,
      payload: data,
    });
  });
};
export const updateProfile = data => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.profile, 'POST', data).then(
    response => {
      const { data } = response;
      Alert.alert('Berhasil', data.msg);
      dispatch({ type: SUCCES });
    },
  );
};
