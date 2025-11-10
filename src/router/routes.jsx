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
        loader: async () => {
          const response = await fetch('http://localhost:3000/latest-vehicles');
          if (!response.ok) throw new Error('Failed to fetch');
          return response.json();
        }
      }, 
      {
        path: "/all-vehicles",
        element: <AllVehicles />,
        loader: async () => {
          const response = await fetch('http://localhost:3000/vehicles');
          if (!response.ok) throw new Error('Failed to fetch');
          return response.json();
        }
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