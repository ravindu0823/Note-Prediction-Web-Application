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
export const VALIDATE_ADMIN = "admin/protected";

export const ACTIVE_USER_COUNT = "users/active/count";
export const ACTIVE_FEEDBACK_COUNT = "feedback/active/count";
export const NEWS_COUNT = "news/count";
export const PREDICT_COUNT = "predict/count";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASEURL,
  withCredentials: true,
});
