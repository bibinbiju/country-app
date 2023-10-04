import React, { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { requiredRule, validateEmail } from "../../utils/validationRules";
import useForm from "../../hooks/useForm";
import { STORAGE_KEYS, Storage } from "../../utils/storage";
import "./login.scss";
import Button from "../../components/Button";
const formObject = {
  email: {
    validationRules: [requiredRule("Email"), validateEmail("Email")],
  },
  password: {
    validationRules: [requiredRule("Password")],
  },
};
const Login = () => {
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState("");
  const { form, onInputChange, isFormValid } = useForm(formObject);
  const doLogin = useCallback(() => {
    setLoginErr("");
    const params = {
      email: form?.email?.value?.trim?.()?.toLowerCase?.() || "",
      password: form?.password?.value || "",
    };
    const users = Storage.getItem(STORAGE_KEYS.APP_USERS) || [];
    const checkValidUser = users.find(
      (d) =>
        d.email?.toLowerCase?.() === params?.email?.toLowerCase?.() &&
        d.password === params.password
    );
    if (checkValidUser) {
      Storage.setItem(STORAGE_KEYS.APP_TOKEN, checkValidUser?.email);
      navigate("/");
    } else {
      setLoginErr("Invalid username or password! 🤷‍♀️");
    }
  }, [form, navigate]);
  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <h2>Login</h2>
        <div className="form-content-wrapper">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              onChange={onInputChange}
            />
            <span className="error-msg">{form?.email?.errorMessage}</span>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              onChange={onInputChange}
            />
            <span className="error-msg">{form?.password?.errorMessage}</span>
          </div>
          <span className="error-msg">{loginErr}</span>
        </div>
        <div className="other-action-wrapper">
          <NavLink as="a" to="/register">
            Register Here 👉
          </NavLink>
        </div>
        <div className="button-wrapper">
          <Button disabled={!isFormValid} onClick={doLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;
