import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import TableHeading from '../../../components/shared/TableHeading';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const TopRequestedItem = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isPending } = useQuery({
    queryKey: ['top-request-hr', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`assets/top-request/${user?.email}`);
      return data;
    },
  });

  if (isPending || loading) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="container mx-auto px-4 md:px-0">
      <TableHeading heading={'Top Most Requested Items'} />
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Product name</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Request count</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Requester name</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Requester email</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span>Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {/* table row */}
                  {data?.map((item) => (
                    <tr key={item._id}>
                      <td className="whitespace-nowrap py-4 pl-6 text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">{item?.product_name}</span>
                      </td>
                      <td className="whitespace-nowrap pl-6 text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          <p className="w-max rounded-full bg-blue-100/60 px-3 py-1 text-xs tracking-wider text-blue-500 dark:bg-gray-800">
                            {item?.request_count}
                          </p>
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">
                          {item?.requester_info?.name}
                        </span>
                      </td>

                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700 dark:text-gray-200">
                        <span className="capitalize">
                          {item?.requester_info?.email}
                        </span>
                      </td>
                      <td>
                        <div
                          className={`inline-flex items-center gap-x-2 rounded-full px-3 py-1 dark:bg-gray-800 ${item?.status === 'pending' && 'bg-amber-100/60'} ${item?.status === 'approve' && 'bg-emerald-100/60'} ${item?.status === 'reject' && 'bg-rose-100/60'}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${item?.status === 'pending' && 'bg-amber-500'} ${item?.status === 'approve' && 'bg-emerald-500'} ${item?.status === 'reject' && 'bg-rose-500'}`}
                          />
                          <span
                            className={`text-sm font-normal capitalize ${item?.status === 'pending' && 'text-amber-500'} ${item?.status === 'approve' && 'text-emerald-500'} ${item?.status === 'reject' && 'text-rose-500'}`}
                          >
                            {item?.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRequestedItem;
