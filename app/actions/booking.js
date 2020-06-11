/* eslint-disable import/prefer-default-export */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable arrow-parens */
import { Alert } from 'react-native';
import api from '../services/api';
import EndPoints from '../constants/endPoints';
import {
  BOOKING,
  LAYANAN,
  ANTRIAN,
  HASIL_LAB,
  HASIL_LAB_DETAIL,
} from '../constants/actionTypes';

export const getBooking = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.getBooking).then(response => {
    const { data } = response;
    dispatch({
      type: BOOKING,
      payload: data,
    });
  });
};

export const getLayanan = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.getLayanan).then(response => {
    const { data } = response;
    dispatch({
      type: LAYANAN,
      payload: data,
    });
  });
};

export const getHistoryAntrian = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.getHistoryAntrian).then(response => {
    const { data } = response;
    dispatch({
      type: ANTRIAN,
      payload: data,
    });
  });
};

export const getPasienLab = () => (dispatch, getState) => {
  return api(getState, dispatch, EndPoints.getHistoryPasienLab).then(
    response => {
      const { data } = response;
      dispatch({
        type: HASIL_LAB,
        payload: data,
      });
    },
  );
};
export const getPasienDetailLab = id => (dispatch, getState) => {
  return api(
    getState,
    dispatch,
    `${EndPoints.getHistoryDetailPasienLab}${id}`,
  ).then(response => {
    const { data } = response;
    dispatch({
      type: HASIL_LAB_DETAIL,
      payload: data,
    });
  });
};

export const postBooking = (id, navigate, selectPackage) => (
  dispatch,
  getState,
) => {
  const param = selectPackage ? { id_paket: id } : { id_layanan: id };
  return api(getState, dispatch, EndPoints.postBooking, 'post', param).then(
    response => {
      const { data } = response;
      const { success, msg } = data;

      if (!success) {
        Alert.alert('Gagal', msg, [{ text: 'OK', onPress: () => navigate() }], {
          cancelable: false,
        });
      } else {
        dispatch({
          type: BOOKING,
          payload: { data },
        });
        setTimeout(() => navigate(), 100);
      }
    },
  );
};

export const cancelBooking = (id_booking, navigate) => (dispatch, getState) => {
  const param = { id_booking };
  return api(getState, dispatch, EndPoints.bookingVoid, 'post', param).then(
    response => {
      const { data } = response;
      const { success, msg } = data;

      if (!success) {
        Alert.alert('Gagal', msg, [{ text: 'OK', onPress: () => navigate() }], {
          cancelable: false,
        });
      } else {
        Alert.alert(
          'Berhasil',
          msg,
          [{ text: 'OK', onPress: () => navigate() }],
          {
            cancelable: false,
          },
        );
      }
    },
  );
};
