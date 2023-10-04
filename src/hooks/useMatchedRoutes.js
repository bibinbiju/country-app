import { matchRoutes, useLocation } from "react-router-dom";
const useMatchedRoute = (routes = []) => {
  const location = useLocation();
  return matchRoutes(routes, location.pathname)
    .reverse()
    .find((each) => each.pathname === location.pathname);
};
export default useMatchedRoute;
