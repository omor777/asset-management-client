import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Title from '../../components/Title/Title';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';

const UpdateAsset = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: asset = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ['update-asset', id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/asset/${id}`);
      return data;
    },
  });

  const handleUpdateAsset = async (e) => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const product_type = form.product_type.value;
    const product_quantity = parseInt(form.product_quantity.value);
    const updatedData = {
      product_name,
      product_type,
      product_quantity,
    };
    try {
      const { data } = await axiosSecure.patch(`/asset/${id}`, updatedData);
      if (data.modifiedCount > 0) {
        refetch();
        successAlert('Update successful!');
      }
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  if (isPending) return <LoadingSpinner h={'50vh'} />;

  return (
    <section className="pt-40">
      <Title title={'AssetAura | Update Asset'} />
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow-form dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-2xl md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <form
              onSubmit={handleUpdateAsset}
              className="space-y-4 md:space-y-6"
              noValidate
            >
              <div>
                <label
                  htmlFor="product_name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>

                <input
                  defaultValue={asset?.product_name}
                  name="product_name"
                  type="text"
                  id="product_name"
                  className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                  placeholder="product name here"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="product_type"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Type
                </label>
                <select
                  defaultValue={asset?.product_type}
                  name="product_type"
                  required
                  id="product_type"
                  className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="product_quantity"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Quantity
                </label>
                <input
                  defaultValue={asset?.product_quantity}
                  name="product_quantity"
                  required
                  type="number"
                  id="product_quantity"
                  placeholder="product quantity here"
                  className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateAsset;
