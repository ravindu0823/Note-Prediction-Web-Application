import axios from "axios";

export const USER_LOGIN = "users/login";

export default axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});
