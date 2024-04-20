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
import { Link, useLocation, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { navListItems } from "../utils/NavData";
import ProfileMenu from "./ProfileMenu";
import { ReactToast } from "../utils/ReactToast";
import { AuthContext } from "../contexts/AuthContext";

// nav list component
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-center mx-auto">
      {navListItems.map(({ label, icon, link }) => (
        <>
          <Link to={link}>
            <Typography
              key={label}
              as={"a"}
              placeholder={true}
              // href={link}
              className="font-medium hover:text-black"
            >
              <MenuItem className="flex items-center gap-2" placeholder={true}>
                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
                <span className="">{label}</span>
              </MenuItem>
            </Typography>
          </Link>
        </>
      ))}
    </ul>
  );
}

export function ComplexNavbar({ className }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn, user, signOut } = useContext(AuthContext);
  const [navbarColor, setNavbarColor] = useState("transparent");

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
      label: `${user?.fullName || "User"}`,
      icon: UserCircleIcon,
      onclick: () => {
        navigate("/profile");
      },
    },

    {
      label: "Sign Out",
      icon: PowerIcon,
      onclick: () => {
        signOut();
        ReactToast("Logged out successfully", "success");
      },
    },
  ];

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

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

        <div
          className={`hidden lg:flex ${isSignedIn ? `lg:mr-24` : `lg:mr-12`}`}
        >
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
          {isSignedIn ? (
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
              Log In
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
