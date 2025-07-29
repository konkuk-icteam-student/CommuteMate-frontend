import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Home from "../pages/Home";
import TasksToday from "../pages/TasksToday";
import CheckIn from "../pages/CheckIn";
import ScheduleApply from "../pages/schedule/ScheduleApply";
import ScheduleChange from "../pages/schedule/ScheduleChange";
import ScheduleHistory from "../pages/schedule/ScheduleHistory";
import ScheduleHome from "../pages/schedule/ScheduleHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/check-in",
    element: <CheckIn />,
  },
  {
    path: "/tasks/today",
    element: <TasksToday />,
  },
  {
    path: "/schedule",
    element: <ScheduleHome />,
  },
  {
    path: "/schedule/apply",
    element: <ScheduleApply />,
  },
  {
    path: "/schedule/change",
    element: <ScheduleChange />,
  },
  {
    path: "/schedule/history",
    element: <ScheduleHistory />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
