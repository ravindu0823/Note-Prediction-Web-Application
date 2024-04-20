import { ReactToast } from "./ReactToast";

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const validateFeedbackData = (feedbackData) => {
  if (!feedbackData.firstName) {
    return ReactToast("Please enter your First Name", "error");
  }

  if (!feedbackData.lastName) {
    return ReactToast("Please enter your Last Name", "error");
  }

  if (!feedbackData.email) {
    return ReactToast("Please enter your Email", "error");
  }

  if (!validateEmail(feedbackData.email)) {
    return ReactToast("Please double check your Email", "error");
  }

  if (!feedbackData.phoneNumber) {
    return ReactToast("Please enter your Phone Number", "error");
  }

  if (!feedbackData.feedback) {
    return ReactToast("Please enter your Feedback", "error");
  }

  return true;
};
