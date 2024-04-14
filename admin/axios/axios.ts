import axios from "axios";

export const ADMIN_LOGIN = "admin/login";
export const GET_ALL_USERS = "users";
export const GET_ALL_NEWS = "news";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASEURL,
  withCredentials: true,
});
