/* eslint-disable arrow-parens */
import _ from 'lodash';
import axios from 'axios';
import EndPoints from '../constants/endPoints';

const insertFormData = (formData, key, value) => {
  if (_.isPlainObject(value)) {
    if (value.uri && value.type) {
      formData.append(key, value);
    } else {
      _.forEach(value, (v2, k2) => {
        insertFormData(formData, `${key}[${k2}]`, v2);
      });
    }
  } else if (_.isArray(value)) {
    _.forEach(value, v2 => {
      insertFormData(formData, `${key}[]`, v2);
    });
  } else {
    formData.append(key, value);
  }
};

const transformFormData = data => {
  const form = new FormData();
  _.forEach(data, (v, k) => {
    insertFormData(form, k, v);
  });
  return form;
};

const api = (getState, dispatch, endPoint, method = 'get', params, headers) => {
  const { token } = getState().session;
  console.log({
    method,
    url: `${EndPoints.BASE_URL}${endPoint}`,
    headers: {
      Authorization: token ? token : '',
      'Content-Type': 'application/json',
      ...headers,
    },
    params: method === 'get' ? params : {},
    data: method === 'post' || method === 'put' ? params : undefined,
    transformRequest: [
      (requestData, requestHeaders) => {
        if (requestHeaders['Content-Type'] === 'multipart/form-data') {
          return transformFormData(requestData);
        }
        return JSON.stringify(params);
      },
    ],
  });
  return axios({
    method,
    url: `${EndPoints.BASE_URL}${endPoint}`,
    headers: {
      Authorization: token ? token : '',
      'Content-Type': 'application/json',
      ...headers,
    },
    params: method === 'get' ? params : {},
    data: method === 'post' || method === 'put' ? params : undefined,
    transformRequest: [
      (requestData, requestHeaders) => {
        if (requestHeaders['Content-Type'] === 'multipart/form-data') {
          return transformFormData(requestData);
        }
        return JSON.stringify(params);
      },
    ],
  })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      const { response } = error;
      console.log(response);
      throw new Error(error);
    });
};

export default api;
