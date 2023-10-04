import { Navigate } from "react-router-dom";
import Auth from "../../utils/auth";

const Authenticate = ({ redirectPath = "/login", children }) => {
  /***Authentication check***/
  if (!Auth.isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
export default Authenticate;
