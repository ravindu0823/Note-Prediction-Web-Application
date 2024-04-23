import { useState, createContext, useEffect } from "react";
import propTypes from "prop-types";
import {
  validateUserLoginData,
  validateUserRegisterData,
} from "../utils/UserDataValidation";
import axios, { USER_LOGIN, USER_REGISTER, USER_VALIDATE } from "../api/axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateUserToken = async () => {
      const token = Cookies.get("token");

      if (!token) setIsSignedIn(false);

      try {
        const res = await axios.get(USER_VALIDATE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.statusText) setIsSignedIn(false);

        const decodedToken = jwtDecode(token);

        setIsSignedIn(true);
        setUser(decodedToken);
      } catch (error) {
        setIsSignedIn(false);
      }
    };

    validateUserToken();
  }, [setIsSignedIn]);

  const signIn = async (userData) => {
    if (validateUserLoginData(userData)) {
      try {
        const response = await axios.post(USER_LOGIN, { userData });

        const { token } = response.data;
        Cookies.set("token", token);

        const decodedToken = jwtDecode(token);
        setUser(decodedToken);

        setIsSignedIn(true);
        return {
          status: true,
          message: `Welcome back ${decodedToken.fullName}!`,
        };
      } catch (error) {
        console.error(error);

        if (error.response.status === 404) {
          return {
            status: false,
            message: error.response.data.error,
          };
        }

        if (error.response.status === 401) {
          return {
            status: false,
            message: error.response.data.error,
          };
        }
      }
    }
  };

  // User Sign Out
  const signOut = async () => {
    Cookies.remove("token");
    setIsSignedIn(false);
    return true;
  };

  // User Sign Up
  const signUp = async (userData) => {
    if (validateUserRegisterData(userData)) {
      try {
        const response = await axios.post(USER_REGISTER, { userData });

        const { token } = response.data;
        Cookies.set("token", token);

        const decodedToken = jwtDecode(token);
        setUser(decodedToken);

        setIsSignedIn(true);

        return {
          status: true,
          message: `Hello ${decodedToken.fullName}, Welcome to Musify!`,
        };
      } catch (error) {
        console.error(error);
        return {
          status: false,
          message: error.response.data.error,
        };
      }
    }
  };

  console.log(user);
  console.log(isSignedIn);

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
