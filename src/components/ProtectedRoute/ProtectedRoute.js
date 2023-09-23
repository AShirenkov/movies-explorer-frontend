function ProtectedRoute({ isLoggedIn, element: Component, ...props }) {
  return isLoggedIn && <Component {...props} />;
}

export default ProtectedRoute;
