import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../../utils/alert';

const MyEmployeeList = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isPending, refetch } = useQuery({
    queryKey: ['my-team', user?.email, currentPage, itemsPerPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-team/${user?.email}?page=${currentPage}&size=${itemsPerPage}`,
      );
      return data;
    },
  });

  const employees = data?.employees;
  const count = data?.count;

  const totalPages = Math.ceil(count / itemsPerPage);
  let pages;
  if (!isPending) {
    pages = [...Array(totalPages).keys()].map((page) => page + 1);
  }

  // handle remove form team
  const { mutateAsync } = useMutation({
    mutationFn: async (removeData) => {
      const empEmail = removeData.employee_info.email;
      const hrEmail = removeData.hr_info.email;

      const { data } = await axiosSecure.delete(
        `/team/${removeData?._id}?empEmail=${empEmail}&hrEmail=${hrEmail}`,
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      {
        data.deletedCount > 0;
      }
      {
        successAlert('Member Remove successfully!');
      }
    },
    onError: (error) => {
      errorAlert(error.message);
    },
  });

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

  if (isPending || loading) return <LoadingSpinner h={'90vh'} />;
  return (
    <div className="container pt-40">
      <section>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-10 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Image</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Name</span>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Member Type</span>
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                      >
                        <span className="whitespace-nowrap">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                    {employees?.map((employee) => {
                      //   console.log(employee);
                      const { _id, employee_info } = employee ?? {};
                      return (
                        <tr key={_id}>
                          <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                            <span className="">
                              <img
                                className="ml-14 size-14 rounded-full object-cover"
                                src={employee_info?.image}
                                alt=""
                              />
                            </span>
                          </td>
                          <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-700">
                            <span className="capitalize dark:text-gray-300">
                              {employee_info.name}
                            </span>
                          </td>
                          <td>
                            <p className="w-max rounded-full bg-blue-100/60 px-4 py-1.5 text-sm capitalize text-blue-500 dark:bg-gray-800">
                              <span>{employee_info.role}</span>
                            </p>
                          </td>
                          <td>
                            <button
                              onClick={() => mutateAsync(employee)}
                              className="w-20 rounded bg-rose-500 py-1 text-sm font-medium text-white shadow-tableBtn transition-colors duration-200 hover:bg-rose-700"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
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
    </div>
  );
};

export default MyEmployeeList;
