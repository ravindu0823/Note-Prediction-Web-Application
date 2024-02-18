import { ReactToast } from "./ReactToast";

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const validateUserRegisterData = (userData) => {
  if (!userData.fullName) {
    return ReactToast("Please enter your Full Name", "error");
  }

  if (!userData.userName) {
    return ReactToast("Please enter your Username", "error");
  }

  if (!userData.password) {
    return ReactToast("Please enter your Password", "error");
  }

  if (!userData.email && !validateEmail(userData.email)) {
    return ReactToast("Please double check your Email", "error");
  }

  return true;
};

export const validateUserLoginData = (userData) => {
  if (!userData.userName) {
    return ReactToast("Please enter your Username", "error");
  }

  if (!userData.password) {
    return ReactToast("Please enter your Password", "error");
  }

  return true;
};
