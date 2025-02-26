import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_API_URL}/auth`;

export const login = (credentials) =>
  axios.post(`${API_URL}/login`, credentials);

export const register = (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const getCurrentUser = () => {
  const accessToken = localStorage.getItem("accessToken");
  return axios.get(`${API_URL}/current`, {
    headers: {
      Authorization: accessToken,
    },
  });
};
