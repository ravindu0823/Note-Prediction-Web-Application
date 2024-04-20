import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { ReactToast } from "../utils/ReactToast";

export const PrivateRoute = () => {
  const { isSignedIn } = useContext(AuthContext);
  if (!isSignedIn) {
    ReactToast("You must be signed in to view this page.", "error");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const PrivateRouteForAuth = () => {
  const { isSignedIn } = useContext(AuthContext);
  if (isSignedIn) {
    ReactToast("You are already signed in.", "error");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
