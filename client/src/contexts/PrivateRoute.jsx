import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isSignedIn } = useContext(AuthContext);

  return isSignedIn ? <Outlet /> : <Navigate to="/login" />;
};

export const PrivateRouteForAuth = () => {
  const { isSignedIn } = useContext(AuthContext);

  return isSignedIn ? <Navigate to="/" /> : <Outlet />;
};
