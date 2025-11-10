import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/Home/Home";
import AllVehicles from "../Pages/AllVehicles/AllVehicles";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch('http://localhost:3000/latest-vehicles')
      },
      {
        path: "/all-vehicles",
        element: <AllVehicles />,
        loader: () => fetch('http://localhost:3000/vehicles')

      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      }
    ],
  },
]);
