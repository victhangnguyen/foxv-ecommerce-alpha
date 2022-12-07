import { useSelector } from 'react-redux';
import { Navigate, useOutlet } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const outlet = useOutlet();

  const {
    user: { result, token },
  } = useSelector((state) => ({ ...state.auth }));

  const isAllowed = token && result.role >= 1; //! 1: user
  

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  // return children ? children : <Outlet />;
  return children ? children : outlet;
};

export default UserRoute;
