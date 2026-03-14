import axios, { type AxiosInstance } from 'axios';

import { env } from './env';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.APP_BASE_PATH,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
