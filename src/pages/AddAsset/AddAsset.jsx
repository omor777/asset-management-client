import { useForm } from 'react-hook-form';
import Title from '../../components/Title/Title';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      product_name: '',
      product_type: '',
      product_quantity: '',
    },
  });

  const onSubmit = async (data) => {
    const assetInfo = {
      ...data,
      availability: 'Available',
      added_date: new Date(),
      request_count: 0,
      provider_info: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
    };
    try {
      //
      const { data } = await axiosSecure.post('/assets', assetInfo);
      if (data.insertedId) {
        reset();
        successAlert('Your asset have been added');
      }
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  return (
    <section className="pt-36">
      <Title title={'AssetAura | Add Asset'} />
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow-form dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-2xl md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
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
                  {...register('product_name', { required: true })}
                  type="text"
                  id="product_name"
                  className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                  placeholder="product name here"
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
                  {...register('product_type', { required: true })}
                  defaultValue={''}
                  id="product_type"
                  className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                >
                  <option disabled value="">
                    Choose product type
                  </option>
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
                  {...register('product_quantity', { valueAsNumber: true })}
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
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAsset;
