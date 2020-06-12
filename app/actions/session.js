/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable arrow-parens */
import {Alert} from 'react-native';
import api from '../services/api';
// import _ from 'lodash';
import EndPoints from '../constants/endPoints';
import {USER} from '../constants/actionTypes';

export const login = (username, password, navigateSucces) => (
  dispatch,
  getState,
) => {
  const params = {
    email: username,
    password,
  };
  console.log('params', params);
  return api(getState, dispatch, EndPoints.login, 'post', params).then(
    (response) => {
      const {data} = response;
      const {message} = data;
      if (message) {
      } else {
        dispatch({
          type: USER,
          payload: {
            data: data.user,
            token: data.access_token,
          },
        });
        setTimeout(() => navigateSucces(), 0);
      }
    },
  );
};

export const register = (
  {username, password, password_conf, hp_email},
  navigateSucces,
) => (dispatch, getState) => {
  const params = {
    username,
    password,
    password_conf,
    hp_email,
  };
  return api(getState, dispatch, EndPoints.register, 'POST', params).then(
    (response) => {
      const {data} = response;
      const {msg} = data;
      if (msg) {
        Alert.alert('Error', response.data.msg);
      } else {
        dispatch({
          type: USER,
          payload: {data: response.data.data, barcode: response.data.barcode},
        });
        setTimeout(() => navigateSucces(), 0);
      }
    },
  );
};

export const logout = () => ({
  type: 'RESET_STATE',
});
