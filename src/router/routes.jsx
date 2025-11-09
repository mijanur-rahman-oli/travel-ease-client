import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Registration";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [

      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);
