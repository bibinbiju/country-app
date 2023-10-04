import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.scss";
import Auth from "../../utils/auth";
import { STORAGE_KEYS, Storage } from "../../utils/storage";
import Button from "../../components/Button";
const Header = () => {
  const navigate = useNavigate();
  const currentUser = Auth.getCurrentUserDetail();
  const logoutUser = () => {
    Storage.removeItem(STORAGE_KEYS.APP_TOKEN);
    navigate("/login");
  };
  return (
    <header className="header-wrapper">
      <div className="logo">
        <h2>Country App</h2>
      </div>
      {Auth.isAuthenticated() && (
        <div className="user-info">
          <h3>{currentUser?.name || ""}</h3>
          <Button onClick={logoutUser}>Logout</Button>
        </div>
      )}
    </header>
  );
};
export default Header;
