import axios from 'axios';
const axiosCommon = axios.create({
  baseURL: 'http://localhost:4000',
  // baseURL: 'https://asset-management-server-delta.vercel.app',
});

const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
