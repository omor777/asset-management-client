import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAlert = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isJoin, isLoading } = useQuery({
    queryKey: ['isJoin', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/${user?.email}`);
      return data.isJoin;
    },
  });

  return [isJoin, isLoading];
};

export default useAlert;
