import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:9002',
  withCredentials: true, // sends cookies (JWT) automatically
});

export default API;