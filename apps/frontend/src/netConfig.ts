import axios from 'axios';

export const BASE_URL = 'http://localhost';

export const API = axios.create({
  baseURL: BASE_URL
});
