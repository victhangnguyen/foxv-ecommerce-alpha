import axiosInstance from './axiosInstance';

const userAPI = {
  postSignIn: (formData, config) => {
    const url = `/users/signin`;
    return axiosInstance.post(url, formData, config);
  },

  postSignUp: (formData, config) => {
    const url = `/users/signup`;
    return axiosInstance.post(url, formData, config);
  },

};

export default userAPI;
