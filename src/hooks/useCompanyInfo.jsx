import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useCompanyInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: companyData, isPending } = useQuery({
    queryKey: ['company-info', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/company-info/${user?.email}`);
      return data;
    },
  });
  return [companyData, isPending];
};

export default useCompanyInfo;
