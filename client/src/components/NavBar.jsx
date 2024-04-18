import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  MenuItem,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import musify_logo from "../assets/images/musify_logo.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { SignInContext } from "../contexts/SignInContext";
import Cookies from "js-cookie";
import propTypes from "prop-types";
import axios, { USER_VALIDATE } from "../api/axios";
import { navListItems } from "../utils/NavData";
import ProfileMenu from "./ProfileMenu";
import { ReactToast } from "../utils/ReactToast";

// nav list component
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-center mx-auto">
      {navListItems.map(({ label, icon, link }) => (
        <Typography
          key={label}
          as={"a"}
          placeholder={true}
          href={link}
          className="font-medium hover:text-black"
        >
          <MenuItem className="flex items-center gap-2" placeholder={true}>
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
            <span className="">{label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export function ComplexNavbar({ className }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useContext(SignInContext);
  const location = useLocation();
  const [navbarColor, setNavbarColor] = useState("transparent");

  if (Cookies.get("token")) {
    setLoggedIn(true);
  }

  useEffect(() => {
    const getUserData = async () => {
      const token = Cookies.get("token");

      if (!token) setLoggedIn(false);

      try {
        const res = await axios.get(USER_VALIDATE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.statusText) setLoggedIn(false);
      } catch (error) {
        console.error(error);
        setLoggedIn(false);
      }
    };

    getUserData();
  }, [navigate, setLoggedIn]);

  /* useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/feedback" ||
      location.pathname === "/about"
    ) {
      setNavbarColor("transparent");
    } else {
      setNavbarColor("blue-gray");
    }
  }, [location.pathname]); */

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const profileMenuItems = [
    {
      label: "Dashboard",
      icon: UserCircleIcon,
      onclick: () => {
        console.log("Dashboard");
      },
    },

    {
      label: "Sign Out",
      icon: PowerIcon,
      onclick: () => {
        Cookies.remove("token");
        setLoggedIn(false);
        ReactToast("Logged out successfully", "success");
        navigate(0);
      },
    },
  ];

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  console.log(location.pathname);
  return (
    <Navbar className={className} color={navbarColor} placeholder={"true"}>
      <div className="relative mx-auto flex items-center text-white font-bold">
        <Typography
          placeholder={"true"}
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-bold flex-1 flex lg:flex items-center md:block text-xl gap-3 mx-5"
        >
          <img
            src={musify_logo}
            alt="Musify Logo"
            className="rounded-full"
            width={70}
            height={70}
          />
          Musify
        </Typography>

        <div className={`hidden lg:flex ${loggedIn ? `lg:mr-24` : `lg:mr-14`}`}>
          <NavList />
        </div>

        {/* Responsive hamburger button */}
        <IconButton
          placeholder={"place"}
          size="sm"
          color="white"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto lg:hidden mr-5"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <div className="flex items-center">
          {loggedIn ? (
            <ProfileMenu profileMenuItems={profileMenuItems} />
          ) : (
            <Button
              variant="text"
              size="lg"
              color="white"
              onClick={() => navigate("/login")}
              className="lg:mr-2"
              placeholder={"login"}
            >
              <span>Log In</span>
            </Button>
          )}

          <Button
            variant="filled"
            size="lg"
            color="light-blue"
            className="mr-2 rounded-full ms-7 hidden lg:block"
            placeholder={"Get Started"}
            onClick={() => navigate("/predict")}
          >
            <span>Get Started</span>
          </Button>
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}

ComplexNavbar.propTypes = {
  className: propTypes.string,
};
