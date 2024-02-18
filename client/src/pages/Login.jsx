import { Button, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import musify_logo from "../assets/images/musify_logo.webp";
import { useContext, useState } from "react";
import { UserData } from "../models/User";
import axios from "../api/axios";
import { USER_LOGIN } from "../api/axios";
import Cookies from "js-cookie";
import { ReactToast } from "../utils/ReactToast";
import { validateUserLoginData } from "../utils/UserDataValidation";
import { SignInContext } from "../contexts/SignInContext";

const Login = () => {
  const [userData, setUserData] = useState(UserData);
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(SignInContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateUserLoginData(userData)) {
      try {
        const response = await axios.post(USER_LOGIN, { userData });

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
        <section className="bg-hero-image h-screen bg-cover flex pt-10">
          <div className="w-full lg:w-3/5 mt-24">
            <div className="text-center">
              <Typography
                placeholder={"sign in"}
                variant="h2"
                className="font-bold mb-4 text-white"
              >
                Sign In
              </Typography>
              <Typography
                placeholder={"enter your email and password"}
                variant="paragraph"
                color="blue-gray"
                className="text-lg font-normal text-white"
              >
                Enter your email and password to Sign In.
              </Typography>
            </div>
            <form
              onSubmit={handleLogin}
              className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  placeholder={"username label"}
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 text-lg font-bold text-white"
                >
                  Username
                </Typography>
                <Input
                  value={userData.userName}
                  onChange={(e) =>
                    setUserData({ ...userData, userName: e.target.value })
                  }
                  size="lg"
                  placeholder="johndoe"
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
              </div>

              <Button
                type="submit"
                placeholder={"button sign in"}
                className="mt-10 bg-light-blue-700 hover:bg-light-blue-900"
                fullWidth
              >
                Sign In
              </Button>

              <Typography
                placeholder={"not registered"}
                variant="paragraph"
                className="text-center text-white text-lg font-bold mt-4"
              >
                Not registered?
                <Link
                  to="/register"
                  className="text-white text-lg font-bold ml-1 hover:text-light-blue-700"
                >
                  Create account
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

export default Login;
