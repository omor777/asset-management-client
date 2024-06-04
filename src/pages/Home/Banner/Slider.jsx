import { Link } from 'react-router-dom';
const Slider = ({ img, address, btnText, heading, description }) => {
  return (
    <div
      className="h-[32rem] w-full overflow-hidden rounded-md bg-cover bg-center"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center bg-gray-900/40">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-[40px]">
            {heading}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-lg font-medium text-gray-100">
            {description}
          </p>
          <Link to={address}>
            <button
              type="button"
              className="mt-6 w-44 rounded bg-blue-700 py-3 text-sm font-medium text-white shadow-lg transition-colors duration-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {btnText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slider;
