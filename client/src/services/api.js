import axios from 'axios';

const API = axios.create({
  baseURL: 'https://truckflow.onrender.com',
  withCredentials: true, // sends cookies (JWT) automatically
});

export default API;