import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LogIn from "../pages/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
