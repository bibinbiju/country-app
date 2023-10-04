import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import "./layout.scss";
import Header from "./Header";
import Auth from "../../utils/auth";
const PublicLayout = () => {
  /***Authentication check***/
  if (Auth.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="layout-wrapper">
      <Header />
      <Outlet />
    </div>
  );
};
export default PublicLayout;
