// api/axiosClient.js
import axios from 'axios';
import qs from 'qs';

//! initialize Store that will be injected to axios Instance
let store;

export const injectStore = (_store) => {
  store = _store;
};

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    encode: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
});

axiosInstance.interceptors.request.use((config) => {
  let token = store.getState().auth?.user?.token;
  console.log('__Debugger__axiosInstnace__token: ', token);
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosInstance;
