import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { dateFormat } from '../../../utils/date';

const MonthlyRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending } = useQuery({
    queryKey: ['my-monthly-request', user?.email, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/assets/e/monthly-request/${user?.email}?page=${currentPage}&size=${itemsPerPage}`,
      );
      return data;
    },
  });

  const myAssets = data?.myAssets;
  const count = data?.count;

  const totalPages = Math.ceil(count / itemsPerPage);
  let pages;
  if (!isPending) {
    pages = [...Array(totalPages).keys()].map((page) => page + 1);
  }

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handlePrevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="container px-4 lg:px-0">
      <SectionTitle title={'My Monthly Request'} />
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
                      <span className="whitespace-nowrap">Provider email</span>
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
                          {asset?.provider_info?.email}
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
      {/* pagination */}
      <div className="mt-6 flex justify-end">
        <nav aria-label="Page navigation example">
          <ul className="flex h-8 items-center -space-x-px text-sm">
            <li>
              <button
                onClick={handlePrevButton}
                className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-2.5 w-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>

            {pages?.map((page) => {
              return (
                <li key={page}>
                  <button
                    onClick={() => handlePagination(page)}
                    className={`flex h-8 items-center justify-center border px-3 leading-tight ${currentPage === page ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}

            <li>
              <button
                onClick={handleNextButton}
                className={`flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-2.5 w-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default MonthlyRequest;
