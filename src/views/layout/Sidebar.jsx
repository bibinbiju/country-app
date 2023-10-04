import React from "react";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";
import sidebarMenuConfig from "../../configs/sidebarMenu.config";
const Sidebar = () => {
  return (
    <aside className="sidebar-wrapper">
      {getMenuTreeNodes(sidebarMenuConfig)}
    </aside>
  );
};
export default Sidebar;
/**
 *
 * @param {Array} menuList array of menu items
 * @returns JSXElement
 */
const getMenuTreeNodes = (menuList = []) => {
  const reducerFunction = (pre, item) => {
    pre.push(
      <li key={item.path}>
        <NavLink
          to={item.path}
          as="a"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          {item.icon}
          <span className="desc-label">{item.title || item.key}</span>
        </NavLink>
        {Array.isArray(item?.children) &&
          item.children.length > 0 &&
          getMenuTreeNodes(item.children)}
      </li>
    );
    return pre;
  };
  return (
    <ul className="menu">
      {menuList.reduce((pre, item) => reducerFunction(pre, item), [])}
    </ul>
  );
};
