import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import GithubButton from '../../components/SocialBtn/GithubButton';
import GoogleButton from '../../components/SocialBtn/GoogleButton';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { errorAlert, successAlert } from '../../utils/alert';

const Login = () => {
  const { loginUser, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const form = location?.state ? location?.state : '/';

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await loginUser(email, password);

      successAlert('Login successful!');
      navigate(form);
    } catch (error) {
      console.log(error);
      errorAlert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleLogin();
      successAlert('Login successful');

      const employeeData = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: 'employee',
        isJoin: false,
      };

      // added user info to the db
      await axiosSecure.post('/employees', employeeData);
      // console.table(employeeData);
      navigate(form);
    } catch (error) {
      errorAlert(error.message);
      console.log(error);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { user } = await githubLogin();
      successAlert('Login successful');

      const employeeData = {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: 'employee',
        isJoin: false,
      };

      // added user info to the db
      await axiosSecure.post('/employees', employeeData);

      navigate(form);
    } catch (error) {
      errorAlert(error.message);
      console.log(error);
    }
  };
  return (
    <section className="mb-24 pt-40">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full rounded-md bg-white shadow-form dark:border dark:border-gray-700 dark:bg-gray-900 sm:max-w-2xl md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
              noValidate
            >
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

              <button
                type="submit"
                className="mt-6 w-full rounded bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </form>

            <div className="flex items-center justify-between">
              <span className="w-1/4 border-b dark:border-gray-600 sm:w-1/3" />
              <a
                href="#"
                className="text-center text-xs uppercase text-gray-500 hover:underline dark:text-gray-400"
              >
                or login with email
              </a>
              <span className="w-1/4 border-b dark:border-gray-600 sm:w-1/3" />
            </div>

            <div className="space-y-4">
              <GoogleButton onClick={handleGoogleLogin} />
              <GithubButton onClick={handleGithubLogin} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
