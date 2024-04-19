import { Button, Input, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import musify_logo from "../assets/images/musify_logo.webp";
import { useContext, useEffect, useState } from "react";
import { UserData } from "../models/User";
import { ReactToast } from "../utils/ReactToast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const [userData, setUserData] = useState(UserData);
  const navigate = useNavigate();
  const { isSignedIn, signUp } = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisiblity = () =>
    setConfirmPasswordShown((cur) => !cur);

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { status, message } = await signUp(userData);

    if (!status) {
      ReactToast(message, "error");
      return;
    }

    ReactToast(message, "success");
    navigate("/");
  };

  return (
    <div className="bg-[url('https://klang.io/wp-content/uploads/2024/02/klangio_background_tinified.jpg')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <img
            className="w-24 h-24 mr-2 rounded-full"
            src={musify_logo}
            alt="logo"
          />
          Musify
        </a>
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-[#111827] border border-blue-600">
          <div className="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
            <Typography
              variant="h3"
              className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-white"
            >
              Create an Account
            </Typography>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <Input
                label="Full Name"
                color="white"
                size="lg"
                value={userData.fullName}
                onChange={(e) =>
                  setUserData({ ...userData, fullName: e.target.value })
                }
              />

              <Input
                label="Email Address"
                color="white"
                size="lg"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />

              <Input
                label="Username"
                color="white"
                size="lg"
                value={userData.userName}
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
              />

              <Input
                type={passwordShown ? "text" : "password"}
                label="Password"
                color="white"
                size="lg"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5 fill-white" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 fill-white" />
                    )}
                  </i>
                }
              />

              <Input
                type={confirmPasswordShown ? "text" : "password"}
                label="Confirm Password"
                color="white"
                size="lg"
                value={userData.confirmPassword}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    confirmPassword: e.target.value,
                  })
                }
                icon={
                  <i onClick={toggleConfirmPasswordVisiblity}>
                    {confirmPasswordShown ? (
                      <EyeIcon className="h-5 w-5 fill-white" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 fill-white" />
                    )}
                  </i>
                }
              />

              <Button
                type="submit"
                className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Create An Account
              </Button>
              <p className="text-sm font-light text-center text-gray-300">
                <a
                  href="/login"
                  className="font-medium hover:underline text-primary-500"
                >
                  Already have an account?
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
