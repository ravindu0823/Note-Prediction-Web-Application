import { useState, createContext } from "react";
import propTypes from "prop-types";
import { validateUserLoginData } from "../utils/UserDataValidation";
import axios, { USER_LOGIN } from "../api/axios";
import Cookies from "js-cookie";
import { UserData } from "../models/User";

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(UserData);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (userData) => {
    if (validateUserLoginData(userData)) {
      try {
        const response = await axios.post(USER_LOGIN, { userData });

        const { token } = response.data;
        Cookies.set("token", token);

        setUser({
          fullName: userData.fullName,
          userName: userData.userName,
          email: userData.email,
        });

        setIsSignedIn(true);

        /* ReactToast("Logged in successfully", "success");
          navigate("/"); */
      } catch (error) {
        console.log(error);

        /* if (error.response.status === 404) {
            ReactToast("Invalid Username", "error");
          }
  
          if (error.response.status === 401) {
            ReactToast("Invalid Password", "error");
          } */
      }
    }
  };

  const signOut = () => {
    // Implement sign-out logic here
  };

  const signUp = (newUserData) => {
    // Implement sign-up logic here
  };

  // The value prop of the provider will be the context data
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isSignedIn,
        setIsSignedIn,
        signIn,
        signOut,
        signUp,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};
