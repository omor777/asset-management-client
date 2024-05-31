import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import GithubButton from '../../components/SocialBtn/GithubButton';
import GoogleButton from '../../components/SocialBtn/GoogleButton';
import useAuth from '../../hooks/useAuth';
import { errorAlert, successAlert } from '../../utils/alert';
import './style.css';

const JoinAsEmployee = () => {
  const { createUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await createUser(email, password);
      successAlert('Sing up successful!');
      navigate('/');
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      successAlert('Sing in successful');
      navigate('/');
    } catch (error) {
      errorAlert(error.message);
      console.log(error);
    }
  };

  return (
    <section className="pt-40">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow-form dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-2xl md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <div className="space-y-4">
              <GoogleButton onClick={handleGoogleLogin} />
              <GithubButton />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="w-1/4 border-b dark:border-gray-600 sm:w-1/3" />
              <a
                href="#"
                className="text-center text-xs uppercase text-gray-500 hover:underline dark:text-gray-400"
              >
                or login with email
              </a>
              <span className="w-1/4 border-b dark:border-gray-600 sm:w-1/3" />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              noValidate
            >
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
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>

              <button
                type="submit"
                className="mb-2 me-2 w-full rounded bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sing Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinAsEmployee;
