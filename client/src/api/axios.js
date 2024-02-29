import axios from "axios";

export const USER_LOGIN = "users/login";
export const USER_REGISTER = "users/register";

export default axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});
