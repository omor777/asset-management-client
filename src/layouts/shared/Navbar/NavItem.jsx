import { NavLink } from 'react-router-dom';

const NavItem = ({ label, address }) => {
  return (
    <li>
      <NavLink
        to={address}
        className={({ isActive }) =>
          isActive
            ? 'bg-primary md:text-primary block rounded px-3 py-2 text-sm text-white transition-colors duration-300 md:bg-transparent md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-blue-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
            : 'block rounded px-3 py-2 text-sm text-gray-900 transition-colors duration-300 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
        }
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
