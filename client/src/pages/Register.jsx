import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import musify_logo from "../assets/images/musify_logo.webp";
import { useContext, useState } from "react";
import { UserData } from "../models/User";
import { SignInContext } from "../contexts/SignInContext";
import { validateUserRegisterData } from "../utils/UserDataValidation";
import axios, { USER_REGISTER } from "../api/axios";
import Cookies from "js-cookie";
import { ReactToast } from "../utils/ReactToast";

const Register = () => {
  const [userData, setUserData] = useState(UserData);
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(SignInContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateUserRegisterData(userData)) {
      try {
        const response = await axios.post(USER_REGISTER, { userData });

        const { token } = response.data;
        Cookies.set("token", token);

        setLoggedIn(true);

        ReactToast("Logged in successfully", "success");
        navigate("/");
      } catch (error) {
        console.log(error);

        if (error.response.status === 404) {
          ReactToast("Invalid Username", "error");
        }

        if (error.response.status === 401) {
          ReactToast("Invalid Password", "error");
        }
      }
    }
  };

  return (
    <>
      <div className="relative min-h-screen w-full">
        <section className="bg-hero-image bg-opacity-5 h-screen bg-cover flex pt-10">
          <div className="w-full lg:w-3/5 mt-10">
            <div className="text-center">
              <Typography
                placeholder={"sign in"}
                variant="h2"
                className="font-bold mb-4 text-white"
              >
                Sign Up
              </Typography>
              <Typography
                placeholder={"enter your email and password"}
                variant="paragraph"
                color="blue-gray"
                className="text-lg font-normal text-white"
              >
                Create your account to start using Musify.
              </Typography>
            </div>
            <form
              className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
              onSubmit={handleRegister}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  placeholder={"full name label"}
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 text-lg font-bold text-white"
                >
                  Full Name
                </Typography>
                <Input
                  size="lg"
                  value={userData.fullName}
                  onChange={(e) =>
                    setUserData({ ...userData, fullName: e.target.value })
                  }
                  placeholder="John Doe"
                  className=" !border-t-blue-gray-200 focus:!border-light-blue-700 text-white placeholder-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Typography
                  placeholder={"username label"}
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 text-lg font-bold text-white"
                >
                  Username
                </Typography>
                <Input
                  size="lg"
                  value={userData.userName}
                  onChange={(e) =>
                    setUserData({ ...userData, userName: e.target.value })
                  }
                  placeholder="johndoe"
                  className=" !border-t-blue-gray-200 focus:!border-light-blue-700 text-white placeholder-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Typography
                  placeholder={"email label"}
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 text-lg font-bold text-white"
                >
                  Your email
                </Typography>
                <Input
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  size="lg"
                  placeholder="someone@example.com"
                  className=" !border-t-blue-gray-200 focus:!border-light-blue-700 text-white placeholder-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Typography
                  placeholder={"password label"}
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 text-lg font-bold text-white"
                >
                  Password
                </Typography>
                <Input
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-light-blue-700 text-white placeholder-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                <Typography
                  placeholder={"confirm password label"}
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 text-lg font-bold text-white"
                >
                  Confirm Password
                </Typography>
                <Input
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-light-blue-700 text-white placeholder-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Checkbox
                value={userData.check}
                onChange={(e) =>
                  setUserData({ ...userData, check: e.target.checked })
                }
                className="checked:bg-light-blue-700 checked:border-white"
                label={
                  <Typography
                    placeholder={"terms and conditions"}
                    variant="small"
                    color="gray"
                    className="flex items-center justify-start font-medium text-white"
                  >
                    I agree the&nbsp;
                    <a
                      href="#"
                      className="font-normal text-white transition-colors hover:text-light-blue-700 underline"
                    >
                      Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button
                type="submit"
                placeholder={"button sign in"}
                className="mt-6 bg-light-blue-700 hover:bg-light-blue-900"
                fullWidth
              >
                Sign Up
              </Button>

              <Typography
                placeholder={"not registered"}
                variant="paragraph"
                className="text-center text-white text-lg font-bold mt-4"
              >
                Already have an account?&nbsp;
                <Link
                  to="/login"
                  className="text-white text-lg font-bold ml-1 hover:text-light-blue-700"
                >
                  Log In
                </Link>
              </Typography>
            </form>
          </div>
          <div className="w-2/5 h-full hidden lg:block mr-36">
            <img
              src={musify_logo}
              className="mx-auto mt-24 w-fit rounded-full object-cover"
              width={400}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
