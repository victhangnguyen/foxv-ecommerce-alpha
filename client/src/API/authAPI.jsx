import axiosClient from './axiosClient';

const userAPI = {
  postSignIn: (formData, config) => {
    const url = `/users/signin`;
    return axiosClient.post(url, formData, config);
  },

  postSignUp: (formData, config) => {
    const url = `/users/signup`;
    return axiosClient.post(url, formData, config);
  },

};

export default userAPI;
