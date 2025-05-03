import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMeQuery } from './usersApi';

function RequireAdmin() {
  const { data: user, isLoading } = useGetMeQuery({});
  const location = useLocation();

  if (isLoading) return null;

  return user?.username && user.isAdmin? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location.pathname }} />
  );
}

export default RequireAdmin
