import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useHrData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: hrData = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['manager', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/${user?.email}?role=HR`);
      return data;
    },
  });
  return [hrData, isPending, refetch];
};

export default useHrData;
