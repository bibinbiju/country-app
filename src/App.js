import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import "./styles/styles.scss";
import ModalRoot from "./components/modal/ModalRoot";
import ToastRoot from "./components/toast/ToastRoot";
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModalRoot />
      <ToastRoot />
      <RouterProvider
        router={createBrowserRouter(routes)}
        fallbackElement={<div>Loading...</div>}
      />
    </Suspense>
  );
};
export default App;
