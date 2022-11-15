import axios from 'axios';

export * from './types';

const token = import.meta.env.VITE_GH_PERSONAL_ACCESS_TOKEN;

export const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
  },
});
