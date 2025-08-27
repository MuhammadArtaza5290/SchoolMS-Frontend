import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://school-ms-backend.vercel.app',
  withCredentials: true
});

export default axiosInstance;
