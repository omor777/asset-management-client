import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { dateFormat } from '../../../utils/date';

const MyPendingRequest = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: myAssets } = useQuery({
    queryKey: ['my-pending-request-employee', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/assets/e/pending-request/${user?.email}`,
      );
      return data;
    },
  });

  return (
    <section className="container px-4 lg:px-0">
      <SectionTitle title={'My Pending Request Items'} />
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto shadow-md">
          <div className="min-w-full">
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Asset name</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Asset type</span>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Added date</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Request date</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {myAssets?.map((asset) => (
                    <tr key={asset?._id}>
                      <td className="whitespace-nowrap py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.product_name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.product_type}
                        </span>
                      </td>

                      <td className="whitespace-nowrap py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {dateFormat(asset?.added_date)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 text-center text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {dateFormat(asset?.requested_date)}
                        </span>
                      </td>

                      <td className="whitespace-nowrap text-center text-sm font-medium text-gray-700">
                        <div
                          className={`inline-flex w-24 items-center justify-center gap-x-2 rounded-full py-1 dark:bg-gray-800 ${asset?.status === 'pending' && 'bg-amber-100/60'} ${asset?.status === 'approve' && 'bg-emerald-100/60'} ${asset?.status === 'reject' && 'bg-rose-100/60'} ${asset?.status === 'return' && 'bg-purple-100/60'} ${asset?.status === 'cancel' && 'bg-rose-100/60'}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${asset?.status === 'pending' && 'bg-amber-500'} ${asset?.status === 'approve' && 'bg-emerald-500'} ${asset?.status === 'reject' && 'bg-rose-500'} ${asset?.status === 'return' && 'bg-purple-500'} ${asset?.status === 'cancel' && 'bg-rose-500'}`}
                          />
                          <span
                            className={`text-sm font-normal capitalize ${asset?.status === 'pending' && 'text-amber-500'} ${asset?.status === 'approve' && 'text-emerald-500'} ${asset?.status === 'reject' && 'text-rose-500'} ${asset?.status === 'return' && 'text-purple-500'} ${asset?.status === 'cancel' && 'text-rose-500'}`}
                          >
                            {asset?.status}
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

export default MyPendingRequest;
