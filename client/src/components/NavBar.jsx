import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
  HomeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import musify_logo from "../assets/images/musify_logo.webp";
import { useLocation, useNavigate } from "react-router-dom";
import { SignInContext } from "../contexts/SignInContext";
import Cookies from "js-cookie";
import propTypes from "prop-types";

// profile menu component
const profileMenuItems = [
  {
    label: "Dashboard",
    icon: UserCircleIcon,
  },

  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    link: "/",
  },
  {
    label: "Articles",
    icon: UserCircleIcon,
    link: "/articles",
  },
  {
    label: "About Us",
    icon: CodeBracketSquareIcon,
    link: "/about",
  },
  {
    label: "Contact Us",
    icon: PhoneIcon,
    link: "/feedback",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          placeholder={true}
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            placeholder={true}
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1" placeholder={true}>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              placeholder={"true"}
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                placeholder={"true"}
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

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
  const [navbarColor, setNavbarColor] = useState("blue-gray");

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/feedback" ||
      location.pathname === "/about"
    ) {
      setNavbarColor("transparent");
    } else {
      setNavbarColor("blue-gray");
    }
  }, [location.pathname]);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const logout = () => {
    Cookies.remove("token");
    setLoggedIn(false);
    navigate(0);
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  console.log(location.pathname);
  return (
    <Navbar className={className} color={navbarColor} placeholder={"true"}>
      <div className="relative mx-auto flex items-center text-white font-bold">
        <img
          src={musify_logo}
          alt="Musify Logo"
          className="rounded-full"
          width={70}
          height={70}
        />
        <Typography
          placeholder={"true"}
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-bold lg:flex-1 hidden lg:block md:block text-xl gap-3 mx-5"
        >
          Musify
        </Typography>

        <div className="hidden lg:flex lg:mr-16">
          <NavList />
        </div>

        {/* Responsive hamburger button */}
        <IconButton
          placeholder={"place"}
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <div className="flex items-center">
          {loggedIn ? (
            <ProfileMenu />
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
            variant="text"
            size="lg"
            color="white"
            className="mr-2 bg-light-blue-700 rounded-full ms-7 hidden lg:block"
            placeholder={"get started"}
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
