import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMeQuery } from './usersApi';

function RequireAuth() {
  const { data: isLogged, isLoading } = useGetMeQuery({});
  const location = useLocation();

  if (isLoading) return null;

  return isLogged?.username ? (
    <Outlet />
  ) : (
    <Navigate to={location.pathname + location.search} 
    replace 
    state={{ showLoginModal: true, from: location }} />
  );
}

export default RequireAuth;
