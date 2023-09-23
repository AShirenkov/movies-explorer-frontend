import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, element: Component, ...props }) {
  // return isLoggedIn ? <Component {...props} /> : <Navigate to='/' replace />;
  return isLoggedIn && <Component {...props} />;
}

export default ProtectedRoute;
