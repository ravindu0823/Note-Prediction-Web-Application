import axios from "axios";

export const ADMIN_LOGIN = "admin/login";
export const GET_ALL_NEWS = "news";
export const CREATE_NEWS = "news/add";
export const UPDATE_NEWS = "news/update";
export const DELETE_NEWS = "news/delete";
export const GET_ALL_USERS = "users";
export const GET_ALL_FEEDBACK = "feedback/all";
export const SUSPEND_FEEDBACK = "feedback/suspend";
export const ACTIVATE_FEEDBACK = "feedback/activate";
export const UPDATE_USERS = "users/update";
export const CREATE_USER = "users/register";
export const DELETE_USER = "users/delete";
export const REACTIVATE_USER = "users/reactivate";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASEURL,
  withCredentials: true,
});
