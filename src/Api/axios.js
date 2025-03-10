import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://be-mydo.vercel.app/api/v1/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;