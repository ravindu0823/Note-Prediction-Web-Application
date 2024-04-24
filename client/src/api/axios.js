import axios from "axios";

export const USER_LOGIN = "users/login";
export const USER_REGISTER = "users/register";
export const USER_VALIDATE = "users/protected";
export const GET_ARTICLES = "news";
export const GET_HISTORY = "predict";
export const GET_USER = "users";
export const ANALYZE_CHORDS = "predict/analyzeChords";
export const ANALYZE_NOTES = "predict/analyzeNotes";
export const ANALYZE_BOTH = "predict/analyzeBoth";
export const CREATE_FEEDBACK = "feedback/add";
export const SEND_EMAIL = "emails/send";

export default axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});
