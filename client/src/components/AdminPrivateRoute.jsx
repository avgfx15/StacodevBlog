import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { currentUserState } from '../redux/User/UserSlice';

const AdminPrivateRoute = () => {
  const currentUser = useSelector(currentUserState);

  return currentUser?.isAdmin ? <Outlet /> : <Navigate to={'/signin'} />;
};

export default AdminPrivateRoute;
