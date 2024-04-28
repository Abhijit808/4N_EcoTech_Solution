import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import Schedule from "../pages/Schedule";
import PrivateRoute from "./Privateroute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ScheduleEvents",

    element: (
      <PrivateRoute>
        <Schedule />,
      </PrivateRoute>
    ),
  },
]);
