import axios from 'axios';
import { api } from '../common/constants';
import { AuthResponse } from '../models/models';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const refreshToken = async (): Promise<void> => {
  const response: AuthResponse = await instance.post('/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  localStorage.setItem('token', response.token);
  localStorage.setItem('refreshToken', response.refreshToken);
  instance.defaults.headers.Authorization = `Bearer ${response.token}`;
};

instance.interceptors.response.use(undefined, (error) => {
  if (!(error.response.data.error === 'Unauthorized')) {
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  } else if (localStorage.getItem('token') === null) {
    window.location.href = '/';
  } else {
    refreshToken().catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
    });
  }
});

instance.interceptors.response.use((res) => res.data);

export default instance;
