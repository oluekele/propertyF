// utils/axiosWithAuth.ts
import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    // baseURL: 'https://property-b.vercel.app/api', 
    baseURL:'http://localhost:5000/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // In case your backend checks cookies too
  });
};

export default axiosWithAuth;
