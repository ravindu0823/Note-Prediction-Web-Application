import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import musify_logo from "../assets/images/musify_logo.webp";

const Register = () => {
  return (
    <>
      <div className="relative min-h-screen w-full">
        <section className="bg-hero-image h-screen bg-cover flex pt-10">
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
            <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
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
                  placeholder="John Doe"
                  className=" !border-t-blue-gray-200 focus:!border-light-blue-700 text-white placeholder-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
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
                  placeholder="johndoe"
                  className=" !border-t-blue-gray-200 focus:!border-light-blue-700 text-white placeholder-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
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
                  size="lg"
                  placeholder="someone@example.com"
                  className=" !border-t-blue-gray-200 focus:!border-light-blue-700 text-white placeholder-white"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
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
                  crossOrigin={undefined}
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
                  crossOrigin={undefined}
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
                crossOrigin={undefined}
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
