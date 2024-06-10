import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section className="flex h-screen items-center p-16 dark:bg-gray-50 dark:text-gray-800">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn&apos;t find this page.
          </p>
          <p className="mb-8 mt-4 dark:text-gray-600">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link>
            <button className="rounded border border-blue-500 px-6 py-2.5 font-semibold text-blue-500 shadow-tableBtn transition-colors duration-200 hover:bg-blue-500 hover:text-white">
              Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
