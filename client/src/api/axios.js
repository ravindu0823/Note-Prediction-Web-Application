import axios from "axios";

export const USER_LOGIN = "users/login";
export const USER_REGISTER = "users/register";
export const USER_VALIDATE = "users/protected";
export const GET_ARTICLES = "news";
export const ANALYZE_CHORDS = "predict/analyzeChords";
export const ANALYZE_NOTES = "predict/analyzeNotes";
export const ANALYZE_BOTH = "predict/analyzeBoth";

export default axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});
