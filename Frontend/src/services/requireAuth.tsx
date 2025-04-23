import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMeQuery } from './usersApi';

function RequireAuth() {
  const { data: isLogged, isLoading } = useGetMeQuery({});
  const location = useLocation();

  if (isLoading) return null;

  return isLogged?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}

export default RequireAuth;
