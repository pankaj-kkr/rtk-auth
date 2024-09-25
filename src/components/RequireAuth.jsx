import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../redux/authSlice';

import { getLoggedInUser } from '../utils';

const RequireAuth = () => {
  const { accessToken } = getLoggedInUser() || {};
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};
export default RequireAuth;
