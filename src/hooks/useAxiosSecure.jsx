import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:4000',
  // baseURL: 'https://asset-management-server-delta.vercel.app',
});
const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access-token');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      console.log(err);
    },
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const status = err.response.status;
      if (status === 401 || status === 403) {
        await logoutUser();
        navigate('/login');
      }
      Promise.reject(err);
    },
  );

  return axiosSecure;
};

export default useAxiosSecure;
