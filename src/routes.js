import { Authenticate, Login, Register } from "./views/auth";
import { Favorite } from "./views/favorite";
import { Home } from "./views/home";
import { ProtectedLayout, PublicLayout } from "./views/layout";
import { Profile } from "./views/profile";

const routes = [
  {
    title: "Country App",
    element: <PublicLayout />,
    children: [
      {
        title: "Country App - Login",
        path: "/login",
        element: <Login />,
      },
      {
        title: "Country App - Register",
        path: "/register",
        element: <Register />,
      },
    ],
  },
  /*********PROTECTED ROUTES**********/
  {
    title: "Country App",
    path: "/",
    element: (
      <Authenticate>
        <ProtectedLayout />
      </Authenticate>
    ),
    children: [
      { index: true, title: "Country App", element: <Home /> },
      {
        title: "Profile",
        path: "profile",
        element: <Profile />,
      },
      {
        title: "Favorite",
        path: "favorite",
        element: <Favorite />,
      },
      {
        title: "Country App",
        path: "*",
        element: <Home />,
      },
    ],
  },
  /*************************************/
];
export default routes;
