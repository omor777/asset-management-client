import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { errorAlert, successAlert } from '../../utils/alert';
import { imageUpload } from '../../utils/api';
const JoinAsHrManager = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      company_name: '',
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  // post hr data on db
  const { mutateAsync } = useMutation({
    mutationFn: async (hrData) => {
      const { data } = await axiosCommon.post('/employees', hrData);
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.insertedId) {
        successAlert('Sing up successful');
      }
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const {
      name,
      company_name,
      email,
      photo,
      password,
      pricing,
      profile_image,
    } = data;

    // console.log(data);
    try {
      const profile_url = await imageUpload(profile_image[0]);
      const logo_url = await imageUpload(photo[0]);
      const hrData = {
        name,
        company_name,
        email,
        image: profile_url,
        company_logo: logo_url,
        package_info: {
          price: pricing,
          members: pricing === 5 ? 5 : pricing === 8 ? 10 : 20,
        },
        date_of_birth: startDate,
        payment_status: 'pending',
        role: 'HR',
      };

      console.log(hrData);
      // sing up user
      await createUser(email, password);

      // update profile
      await updateUserProfile(name, profile_url);

      // save manager data to db
      await mutateAsync(hrData);
      navigate('/payment');

      setLoading(false);
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="container pt-40">
      <div className="mx-auto flex flex-col items-center justify-center">
        <div className="w-full rounded-lg bg-white shadow-form dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>

                  <input
                    {...register('name', { required: true })}
                    type="text"
                    id="name"
                    className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    id="email"
                    placeholder="Enter your emails"
                    className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="profile_image"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Profile Image
                  </label>
                  <input
                    {...register('profile_image', { required: true })}
                    type="file"
                    id="profile_image"
                    className="block w-full rounded border border-gray-200 text-sm file:me-4 file:border-0 file:bg-primary file:px-4 file:py-2.5 file:font-medium file:text-white focus:z-10 focus:border-blue-300 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-gray-700 dark:text-neutral-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    {...register('password', { required: true })}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company-name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Name
                  </label>
                        
                  <input
                    {...register('company_name', { required: true })}
                    type="text"
                    id="company-name"
                    className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="photo"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Company Logo
                  </label>
                  <input
                    {...register('photo', { required: true })}
                    type="file"
                    id="photo"
                    className="block w-full rounded border border-gray-200 text-sm file:me-4 file:border-0 file:bg-primary file:px-4 file:py-2.5 file:font-medium file:text-white focus:z-10 focus:border-blue-300 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-gray-700 dark:text-neutral-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="date-of-birth"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Birth
                  </label>
                  <DatePicker
                    className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pricing"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a Package
                  </label>
                  <select
                    {...register('pricing', { valueAsNumber: true })}
                    defaultValue={'null'}
                    id="pricing"
                    className="block w-full rounded border border-blue-300 bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-300 sm:text-sm"
                  >
                    <option disabled value="null">
                      Choose a package
                    </option>
                    <option value="5">5 Members for $5</option>
                    <option value="8">10 Members for $8</option>
                    <option value="15">20 Members for $15</option>
                  </select>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className={`mt-6 inline-flex w-full justify-center rounded bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading ? 'cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <ImSpinner9 className="animate-spin text-xl" />
                ) : (
                  'Sing Up'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsHrManager;
