import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const authenticated = localStorage.getItem("user")?true:false;
  return authenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
