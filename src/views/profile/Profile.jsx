import { useEffect, useState } from "react";
import LocationService from "../../services/locationService";
import useForm from "../../hooks/useForm";
import { requiredRule, validateEmail } from "../../utils/validationRules";
import Button from "../../components/Button";
import Auth from "../../utils/auth";
import "./profile.scss";
import { Toast } from "../../components/toast/ToastRoot";
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
const Profile = () => {
  const { form, onInputChange, isFormValid, updateForm } = useForm(formObject);
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

    const currentUser = Auth.getCurrentUserDetail();
    const updateData = {};
    for (const each in currentUser) {
      updateData[each] = { value: currentUser[each] };
    }
    updateForm(updateData);
    return () => {
      ignore = true;
    };
  }, [updateForm]);
  const updateUser = () => {
    const updateData = {};
    for (const each in form) {
      updateData[each] = form[each]?.value || "";
    }
    Auth.updateCurrentUser(updateData);
    Toast.success("Profile updated successfully!! 😊");
  };
  return (
    <div className="profile-wrapper">
      <h3>Profile</h3>
      <div className="form-content-wrapper">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={onInputChange}
            value={form?.name?.value}
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
            readOnly
            value={form?.email?.value}
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
            value={form?.country?.value}
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
            value={form?.password?.value}
            onChange={onInputChange}
          />
          <span className="error-msg">{form?.password?.errorMessage}</span>
        </div>
      </div>
      <div className="button-wrapper">
        <Button disabled={!isFormValid} onClick={updateUser}>
          Update
        </Button>
      </div>
    </div>
  );
};
export default Profile;
