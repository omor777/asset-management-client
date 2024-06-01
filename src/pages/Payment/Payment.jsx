import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useHrData from '../../hooks/useHrData';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

const Payment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [hrData, isPending] = useHrData();

  if (isPending) return <LoadingSpinner h={'90vh'} />;

  return (
    <div className="flex justify-center pt-40">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <h5 className="mb-4 text-2xl font-medium text-gray-500 dark:text-gray-400">
          {hrData?.package_info?.price === 8 && 'Basic'}
          {hrData?.package_info?.price === 15 && 'Golden'}
        </h5>
        <div className="t jc flex items-baseline text-gray-900 dark:text-white">
          <span className="text-3xl font-semibold">$</span>
          <span className="text-5xl font-extrabold tracking-tight">
            {hrData?.package_info?.price}
          </span>
          <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
            /Price
          </span>
        </div>
        <ul role="list" className="my-7 space-y-5">
          <li className="flex items-center">
            <svg
              className="h-4 w-4 flex-shrink-0 text-blue-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="ms-3 text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              {hrData?.package_info?.price === 8 && 5} team members
            </span>
          </li>
        </ul>

        {/* checkout form */}

        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm  />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
