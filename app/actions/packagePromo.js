/* eslint-disable import/prefer-default-export */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable arrow-parens */
import { Alert } from 'react-native';
import api from '../services/api';
import EndPoints from '../constants/endPoints';
import { PROMO, PACKAGE } from '../constants/actionTypes';

export const getPromo = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.promo).then(response => {
    const { data } = response;
    dispatch({
      type: PROMO,
      payload: data,
    });
  });
};

export const getPackage = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.package).then(response => {
    const { data } = response;
    dispatch({
      type: PACKAGE,
      payload: data,
    });
  });
};
