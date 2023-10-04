import React, { useCallback, useEffect, useState } from "react";
import LocationService from "../../services/locationService";
import "./login.scss";
import useForm from "../../hooks/useForm";
import { requiredRule, validateEmail } from "../../utils/validationRules";
import { STORAGE_KEYS, Storage } from "../../utils/storage";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
const formObject = {
  name: {
    validationRules: [requiredRule("Name")],
  },
  email: {
    validationRules: [requiredRule("Email"), validateEmail("Email")],
  },
  country: {
    validationRules: [requiredRule("Country")],
  },
  password: {
    validationRules: [requiredRule("Password")],
  },
};
const Register = () => {
  const { form, onInputChange, isFormValid } = useForm(formObject);
  const [countriesList, setCountriesList] = useState([]);
  useEffect(() => {
    let ignore = false;
    const getCountries = async () => {
      try {
        const res = await LocationService.getCountries();
        if (!ignore && res?.status === 200) {
          setCountriesList(res?.data?.countries || []);
        }
      } catch (error) {
        console.error("API_ERROR💥", error);
      }
    };
    getCountries();
    return () => {
      ignore = true;
    };
  }, []);
  const registerUser = useCallback(() => {
    const params = {
      name: form?.name?.value?.trim?.() || "",
      email: form?.email?.value?.trim?.()?.toLowerCase?.() || "",
      country: form?.country?.value || "",
      password: form?.password?.value || "",
    };
    const users = Storage.getItem(STORAGE_KEYS.APP_USERS) || [];
    const chkUserExist = users.find(
      (d) => d.email?.toLowerCase?.() === params?.email?.toLowerCase?.()
    );
    if (chkUserExist) {
      alert("User already exist!🤦‍♂️");
    } else {
      Storage.setItem(STORAGE_KEYS.APP_USERS, [...users, params]);
      alert("User registered successfully!😊");
    }
  }, [form]);
  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <h2>Register</h2>
        <div className="form-content-wrapper">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={onInputChange}
              className="form-input"
            />
            <span className="error-msg">{form?.name?.errorMessage}</span>
          </div>
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
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              type="country"
              className="form-input"
              onChange={onInputChange}
            >
              <option>--Select--</option>
              {countriesList.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
            <span className="error-msg">{form?.country?.errorMessage}</span>
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
        </div>
        <div className="other-action-wrapper">
          <NavLink as="a" to="/login">
            Login Here 👈
          </NavLink>
        </div>
        <div className="button-wrapper">
          <Button disabled={!isFormValid} onClick={registerUser}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Register;
