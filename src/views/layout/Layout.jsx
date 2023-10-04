import React from "react";
import "./layout.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="sidebar-container-wrapper">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
};
export default Layout;
