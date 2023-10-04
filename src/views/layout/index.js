import React from "react";
const ProtectedLayout = React.lazy(() => import("./Layout"));
const PublicLayout = React.lazy(() => import("./PublicLayout"));
export { ProtectedLayout, PublicLayout };
const Layout = {
  ProtectedLayout,
  PublicLayout,
};
export default Layout;
