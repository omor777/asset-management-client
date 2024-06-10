import { useEffect, useRef, useState } from 'react';
import { FaBars, FaMoon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import CommonNavItem from '../../../components/NavItem/CommonNavItem';
import EmployeeNavItem from '../../../components/NavItem/EmployeeNavItem/EmployeeNavItem';
import HrNavItem from '../../../components/NavItem/HrNavItem/HrNavItem';
import useAuth from '../../../hooks/useAuth';
import useCompanyInfo from '../../../hooks/useCompanyInfo';
import useRoll from '../../../hooks/useRoll';
// import logo1 from '../../../../public/logo1.jpg'
import logo1 from '../../../../public/logo1.jpg';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [theme, setTheme] = useState(true);
  const [companyData] = useCompanyInfo();
  const [loggedInUser] = useLoggedInUser();
  const [role] = useRoll();

  useEffect(() => {
    if (isMenuOpen) {
      mobileMenuRef.current.classList.remove('hidden');
    } else {
      mobileMenuRef.current.classList.add('hidden');
    }
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevMenu) => !prevMenu);
  };

  const handleThemeToggle = () => {
    setTheme(!theme);
    document.documentElement.setAttribute(
      'class',
      `${theme ? 'dark' : 'light'}`,
    );
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          to={'/'}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {role === 'HR' ? (
            <img
              src={loggedInUser && loggedInUser?.company_logo}
              className="size-11 rounded-full object-cover"
              alt="Flowbite Logo"
            />
          ) : (
            <img
              src={(companyData && companyData?.hr_info?.company_logo) || logo1}
              className="size-11 rounded-full object-cover"
              alt="Flowbite Logo"
            />
          )}
          {/* <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            AssetAura
          </span> */}
        </Link>
        <div className="flex space-x-3 lg:order-2 lg:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center gap-5">
            <button onClick={handleThemeToggle}>
              <FaMoon className="text-xl dark:text-gray-300" />
            </button>
            {user ? (
              <button
                onClick={handleLogout}
                type="button"
                className="rounded bg-blue-700 px-5 py-2.5 text-sm font-medium capitalize tracking-wide text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                logout
              </button>
            ) : (
              <Link to={'/login'}>
                <button
                  type="button"
                  className="rounded bg-blue-700 px-5 py-2.5 text-sm font-medium capitalize tracking-wide text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  login
                </button>
              </Link>
            )}
          </div>
          <button
            onClick={handleMenuToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
        <div
          ref={mobileMenuRef}
          className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
          id="navbar-sticky"
        >
          <ul className="mt-4 flex flex-col items-center space-y-2 p-4 font-medium dark:border-gray-700 dark:bg-gray-900 lg:mt-0 lg:flex-row lg:space-x-6 lg:space-y-0 lg:border-0 lg:p-0 lg:dark:bg-gray-900 rtl:space-x-reverse">
            {role === undefined && <CommonNavItem />}
            {role === 'employee' && <EmployeeNavItem />}
            {role === 'HR' && <HrNavItem />}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
