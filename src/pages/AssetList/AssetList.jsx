import { useMutation, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';
import { dateFormat } from '../../utils/date';
// TODO: asset update functionality
const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: assets = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const { data } = await axiosSecure('/assets');
      return data;
    },
  });

  //

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/asset/${id}`);
      return data;
    },
    onSuccess: () => {
      refetch();
      successAlert('Asset have been deleted!');
    },
  });

  const handleDeleteAsset = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#f43f5e',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(id);
        } catch (error) {
          console.log(error);
          errorAlert(error.message);
        }
      }
    });
  };

  if (isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="container px-4 pt-40">
      <div className="mt-6 flex flex-col">
        <div className="overflow-x-auto shadow-md">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-10 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      Product Name
                    </th>

                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      Product Type
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400"
                    >
                      Product Quantity
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      Added Date
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-gray-500 dark:text-gray-400 rtl:text-right"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {/* table data row */}
                  {assets?.map((asset) => {
                    const {
                      _id,
                      product_name,
                      product_quantity,
                      product_type,
                      added_date,
                    } = asset || {};
                    return (
                      <tr key={_id}>
                        <td className="whitespace-nowrap py-4 pl-10 text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                          {product_name}
                        </td>

                        <td className="whitespace-nowrap py-4 text-sm text-gray-500 dark:text-gray-300">
                          {product_type}
                        </td>

                        <td className="whitespace-nowrap py-4 pl-4 text-center text-sm font-medium text-gray-700">
                          <p className="w-16 rounded-full bg-purple-100/60 px-4 py-1.5 text-sm text-purple-500 dark:bg-gray-800">
                            {product_quantity < 10
                              ? String(product_quantity).padStart(2, '0')
                              : product_quantity}
                          </p>
                        </td>

                        <td className="whitespace-nowrap py-4 text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                          {dateFormat(added_date)}
                        </td>

                        <td className="whitespace-nowrap py-4 text-sm">
                          <div className="flex items-center gap-x-6">
                            <button
                              onClick={() => handleDeleteAsset(_id)}
                              className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none dark:text-gray-300 dark:hover:text-red-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                            <Link to={`/asset-list/update/${_id}`}>
                              <button className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-5 w-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </button>
                            </Link>
                          </div>
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
    </section>
  );
};

export default AssetList;
