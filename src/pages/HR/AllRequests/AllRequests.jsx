import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../../utils/alert';
import { dateFormat } from '../../../utils/date';

// TODO: reject button function

const AllRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');
  const {
    data: reqAssets = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['req-assets', user?.email,search],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/assets/all-requests/${user?.email}?search=${search}`);
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.reset();
  };

  if (isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="container px-4 pt-40">
      <div>
        <div>
          <form onSubmit={handleSearch}>
            <label
              htmlFor="search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div>
              <div className="flex h-[44px] items-center rounded-e rounded-s shadow">
                <input
                  type="text"
                  name="search"
                  className="h-full rounded-s border border-r-0 border-blue-300 pl-4 outline-none"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  className="inline-flex h-full w-14 items-center justify-center rounded-e border border-l-0 border-blue-500 bg-blue-500"
                >
                  <IoIosSearch className="text-2xl text-white" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5 flex flex-col">
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
      {/* Pagination */}
    </section>
  );
};

export default AllRequests;
