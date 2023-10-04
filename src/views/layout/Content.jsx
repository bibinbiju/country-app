import React from "react";
import { Outlet } from "react-router-dom";
import "./content.scss";
const Content = () => {
  return (
    <section className="content-wrapper">
      <Outlet />
    </section>
  );
};
export default Content;
