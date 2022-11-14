import axios from 'axios';

export * from './types';

export const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
});

axiosInstance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_GH_PERSONAL_ACCESS_TOKEN;
  if (config.headers) {
    config.headers.authorization = `Bearer ${token}`;
    config.headers.accept = 'application/vnd.github+json';
  }

  return config;
});
