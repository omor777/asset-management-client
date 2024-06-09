const Packages = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          <div className="shadow-card transform cursor-pointer rounded px-6 py-4 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-900  dark:hover:bg-gray-800">
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              Base
            </p>
            <h4 className="mt-2 text-3xl font-semibold text-gray-800 dark:text-gray-100">
              $5{' '}
              <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                / Price
              </span>
            </h4>
            <p className="mt-4 text-gray-500 dark:text-gray-300">
              Just Starting Out? This Plan&apos;s Got Your Back.
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
                  Maximum 5 employees
                </span>
              </div>
            </div>
            <button className="mt-10 w-full transform rounded-md bg-blue-500 px-4 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
              Buy
            </button>
          </div>
          <div className="shadow-card transform cursor-pointer rounded px-6 py-4 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-900  dark:hover:bg-gray-800">
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
            <button className="mt-10 w-full transform rounded-md bg-blue-500 px-4 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
              Buy
            </button>
          </div>
          <div className="shadow-card transform cursor-pointer rounded px-6 py-4 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-900  dark:hover:bg-gray-800">
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
            <button className="mt-10 w-full transform rounded-md bg-blue-500 px-4 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none">
              Buy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
