import toast from "react-hot-toast";

export const ReactToast = (message, type) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else if (type === "loading") {
    toast.loading(message);
  }
};
