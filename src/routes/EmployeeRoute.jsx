import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import useRoll from '../hooks/useRoll';

const EmployeeRoute = ({ children }) => {
  const [role, isPending] = useRoll();
  if (isPending) return <LoadingSpinner h={'60vh'} />;
  if (role === 'employee') return children;

  return <Navigate to={'/'} />;
};

EmployeeRoute.propTypes = {
  children: PropTypes.element,
};

export default EmployeeRoute;
