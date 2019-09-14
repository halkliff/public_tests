import axios from 'axios';

export const BASE_URL = 'http://localhost/api';

export const API = axios.create({
  baseURL: BASE_URL
});
