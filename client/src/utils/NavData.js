import {
  CodeBracketSquareIcon,
  HomeIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export const navListItems = [
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
