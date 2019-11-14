import React from "react";
import Home from "@material-ui/icons/Home";
import AccountCircle from "@material-ui/icons/AccountCircle";

export const routes = [
  {
    icon: <Home />,
    link: "/",
    name: "Home"
  }
];
export const nonAuthRoutes = [
  {
    icon: <AccountCircle />,
    link: "/signin",
    name: "SignIn"
  },
  {
    icon: <AccountCircle />,
    link: "/signup",
    name: "SignUp"
  }
];
