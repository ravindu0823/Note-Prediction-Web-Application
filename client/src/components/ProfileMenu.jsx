import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import propTypes from "prop-types";
import { createElement, useState } from "react";

const ProfileMenu = ({ profileMenuItems, image }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            size="md"
            withBorder={true}
            color="blue"
            placeholder={true}
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={
              image
                ? image
                : "https://docs.material-tailwind.com/img/face-2.jpg"
            }
          />
          <ChevronDownIcon
            strokeWidth={2}
            className={`h-4 w-4 transition-transform text-white ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1" placeholder={true}>
        {profileMenuItems.map(({ label, icon, onclick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              placeholder={"true"}
              key={label}
              onClick={onclick}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {createElement(icon, {
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
};

ProfileMenu.propTypes = {
  profileMenuItems: propTypes.array.isRequired,
  image: propTypes.string.isRequired,
};

export default ProfileMenu;
