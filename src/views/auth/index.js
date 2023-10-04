import React from "react";
const Login = React.lazy(() => import("./Login"));
const Authenticate = React.lazy(() => import("./Authenticate"));
const Register = React.lazy(() => import("./Register"));
export { Login, Authenticate, Register };
const Auth = {
  Login,
  Authenticate,
  Register,
};
export default Auth;
