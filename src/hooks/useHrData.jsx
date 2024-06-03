import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useHrData = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: hrData = {}, isPending } = useQuery({
    queryKey: ['manager', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/${user?.email}`);
      return data;
    },
  });
  return [hrData, isPending];
};

export default useHrData;
