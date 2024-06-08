import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import CheckoutForm from './CheckoutForm';

const packageData = [
  {
    id: '1',
    title: 'Base',
    price: 5,
    description: "Just Starting Out? This Plan's Got Your Back.",
    maxEmployee: 5,
  },
  {
    id: '2',
    title: 'Regular',
    price: 8,
    description: 'Growing Team? This Plan Scales with You.',
    maxEmployee: 10,
  },
  {
    id: '3',
    title: 'Premium',
    price: 15,
    description: 'Take Website Asset Management to the Next Level.',
    maxEmployee: 20,
  },
];

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

const Payment = () => {
  const [loggedInUser, isPending] = useLoggedInUser();

  console.log(loggedInUser);

  const [price, setPrice] = useState(null);
  const [isPay, setIsPay] = useState(false);

  const handleChoosePlan = (item) => {
    setPrice(item.price);
    setIsPay(true);
  };

  if (isPending) return <LoadingSpinner h={'90vh'} />;

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {packageData.map((item) => {
            return (
              <div
                key={item.id}
                className="transform cursor-pointer rounded border border-gray-500 px-6 py-4 shadow-card transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-900"
              >
                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {item.title}
                </p>
                <h4 className="mt-2 text-3xl font-semibold text-gray-800 dark:text-gray-100">
                  ${item.price}{' '}
                  <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                    / Price
                  </span>
                </h4>
                <p className="mt-4 text-gray-500 dark:text-gray-300">
                  {item.description}
                </p>
                <div className="mt-8 space-y-8">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="mx-4 text-gray-700 dark:text-gray-300">
                      Maximum {item.maxEmployee} employees
                    </span>
                  </div>
                </div>
                {isPay && item.price === price ? (
                  <div className="mt-8">
                    <Elements stripe={stripePromise}>
                      <CheckoutForm price={price} />
                    </Elements>
                  </div>
                ) : (
                  <>
                    {isPay && (
                      <div className="mt-6 h-10 w-full bg-transparent"></div>
                    )}
                    <button
                      onClick={() => handleChoosePlan(item)}
                      type="button"
                      className="mt-6 w-full rounded bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Choose plan
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Payment;

/**
 * 
 *  <div className="transform cursor-pointer rounded border border-gray-500 px-6 py-4 shadow-card transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Regular
            </p>
            <h4 className="mt-2 text-3xl font-semibold text-gray-800 dark:text-gray-100">
              $8{' '}
              <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                / Price
              </span>
            </h4>
            <p className="mt-4 text-gray-500 dark:text-gray-300">
              Growing Team? This Plan Scales with You.
            </p>
            <div className="mt-8 space-y-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Maximum 10 employees
                </span>
              </div>
            </div>
            <div className="mt-8">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          </div>
          <div className="transform cursor-pointer rounded border border-gray-500 px-6 py-4 shadow-card transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Premium
            </p>
            <h4 className="mt-2 text-3xl font-semibold text-gray-800 dark:text-gray-100">
              $15{' '}
              <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                / Price
              </span>
            </h4>
            <p className="mt-4 text-gray-500 dark:text-gray-300">
              Take Website Asset Management to the Next Level.
            </p>
            <div className="mt-8 space-y-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Maximum 20 employees
                </span>
              </div>
            </div>
            {/* checkout form */

//             <div className="mt-8">
//               <Elements stripe={stripePromise}>
//                 <CheckoutForm />
//               </Elements>
//             </div>
//           </div>
//  */
