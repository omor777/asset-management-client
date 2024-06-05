import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useLoggedInUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: loggedInUser = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['loggedUser', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/${user?.email}`);
      return data;
    },
  });
  return [loggedInUser, isPending, refetch];
};

export default useLoggedInUser;
