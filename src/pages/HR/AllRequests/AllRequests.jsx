import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../../utils/alert';
import { dateFormat } from '../../../utils/date';

// TODO: reject button function

const AllRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: reqAssets = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['req-assets', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/assets/all-requests/${user?.email}`);
      return data;
    },
  });

  // handle approve button
  const handleApprove = async (id) => {
    const updatedAssetData = {
      status: 'approve',
      approve_date: new Date(),
      ...id,
    };

    try {
      await axiosSecure.patch(`/asset/request/approve`, updatedAssetData);
      refetch();
      successAlert('Request have been approved');
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      //
      await axiosSecure.patch(`/asset/update-status/${id}`, {
        status: 'reject',
      });

      successAlert('Request have been rejected!');
      refetch();
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  if (isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="container px-4 pt-40">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Asset Name</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Asset Type</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Requester Name</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Requester Email</span>
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Notes</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Status</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Request Date</span>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      <span className="whitespace-nowrap">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {reqAssets?.map((asset) => (
                    <tr key={asset?._id}>
                      <td className="whitespace-nowrap py-4 pl-6 text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.product_name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.product_type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap p-4 text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.requester_info?.name}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.requester_info?.email}
                        </span>
                      </td>

                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {asset?.additional_notes}
                        </span>
                      </td>

                      <td className="whitespace-nowrap text-sm font-medium text-gray-700">
                        <div
                          className={`inline-flex items-center gap-x-2 rounded-full px-3 py-1 dark:bg-gray-800 ${asset?.status === 'pending' && 'bg-amber-100/60'} ${asset?.status === 'approve' && 'bg-emerald-100/60'} ${asset?.status === 'reject' && 'bg-rose-100/60'} ${asset?.status === 'return' && 'bg-purple-100/60'} ${asset?.status === 'cancel' && 'bg-rose-100/60'}`}
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

                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                        <span className="capitalize dark:text-gray-300">
                          {dateFormat(asset?.requested_date)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 text-sm">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => {
                              handleReject(asset?._id);
                            }}
                            disabled={asset?.status !== 'pending'}
                            className={`rounded px-4 py-1 text-sm tracking-wide text-white shadow-tableBtn transition-all duration-200 ${asset?.status !== 'pending' ? 'cursor-not-allowed bg-rose-900' : 'bg-rose-500 hover:bg-rose-700'}`}
                          >
                            Reject
                          </button>
                          <button
                            disabled={asset?.status !== 'pending'}
                            onClick={() =>
                              handleApprove({
                                assetId: asset?.requestedAssetId,
                                reqId: asset?._id,
                              })
                            }
                            className={`rounded px-4 py-1 text-sm tracking-wide text-white shadow-tableBtn transition-all duration-200 ${asset?.status !== 'pending' ? 'cursor-not-allowed bg-blue-900' : 'bg-primary hover:bg-blue-700'}`}
                          >
                            Approve
                          </button>
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
      <div className="mt-6 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>previous</span>
        </a>
        <div className="hidden items-center gap-x-3 lg:flex">
          <a
            href="#"
            className="rounded-md bg-blue-100/60 px-2 py-1 text-sm text-blue-500 dark:bg-gray-800"
          >
            1
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            2
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            3
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            ...
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            12
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            13
          </a>
          <a
            href="#"
            className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            14
          </a>
        </div>
        <a
          href="#"
          className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default AllRequests;
