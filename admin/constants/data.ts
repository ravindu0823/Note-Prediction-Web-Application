import { NavItem } from "@/types";

export type User = {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  status: string;
};

export type News = {
  _id: string;
  category: string;
  title: string;
  target: string;
  desc: string;
  date: string;
  image: string;
};

export type Feedback = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  feedback: string;
  status: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  {
    title: "News",
    href: "/dashboard/news",
    icon: "news",
    label: "news",
  },
  {
    title: "Feedbacks",
    href: "/dashboard/feedback",
    icon: "feedback",
    label: "feedback",
  },
  /* {
    title: "Employee",
    href: "/dashboard/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  }, */
  /* {
    title: "Kanban",
    href: "/dashboard/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  }, */
];
