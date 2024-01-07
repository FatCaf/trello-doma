import axios from 'axios';
import { api } from '../common/constants';

const test: string = api.baseURL.replaceAll(/'/, '');

const instance = axios.create({
  baseURL: test,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123',
  },
});

instance.interceptors.response.use((res) => res.data);

export default instance;
