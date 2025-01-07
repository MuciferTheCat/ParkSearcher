import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

export const login = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/user/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/user/register`, userData);
  return response.data;
};
