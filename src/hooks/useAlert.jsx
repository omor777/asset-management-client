import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAlert = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data: isJoin, isPending } = useQuery({
    queryKey: ['isJoin', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/employee/${user?.email}`);
      return data.isJoin;
    },
  });

  return [showModal, setShowModal, isJoin, isPending];
};

export default useAlert;
