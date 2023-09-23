import { Navigate } from 'react-router-dom';

function MoviesRoute({ isLoggedIn, element: Component, ...props }) {
  // return isLoggedIn ? <Component {...props} /> : <Navigate to='/' replace />;
  return !isLoggedIn ? <Component {...props} /> : <Navigate to='/movies' replace />;
}

export default MoviesRoute;
