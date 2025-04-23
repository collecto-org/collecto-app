import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMeQuery } from './usersApi';

function RequireAdmin() {
  const { data: isLogged, isLoading } = useGetMeQuery({});
  const location = useLocation();

  if (isLoading) return null;

  return isLogged?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location.pathname }} />
  );
}

export default RequireAdmin
