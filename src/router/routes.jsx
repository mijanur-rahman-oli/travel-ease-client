import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/Home/Home";
import AllVehicles from "../Pages/AllVehicles/AllVehicles";
import PrivateRoute from "./PrivateRoute";
import VehicleDetails from "../Pages/VehicleDetails/VehicleDetails";
import AddVehicles from "../Pages/AddVehicles/AddVehicles";
import MyVehicles from "../Pages/MyVehicles/MyVehicles";
import MyBookings from "../Pages/MyBookings/MyBookings";
import UpdateVehicle from "../Pages/UpdateVehicle/UpdateVehicle";



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
        path: "/vehicle-details/:id",
        element: (<PrivateRoute>
          <VehicleDetails />
        </PrivateRoute>)

      },
      {
        path: "/add-vehicles",
        element: (
          <PrivateRoute>
            <AddVehicles />
          </PrivateRoute>
        ),

      },

      {
        path: "/my-vehicles",
        element: (
          <PrivateRoute>
            <MyVehicles />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-vehicle/:id",
        element: (
          <PrivateRoute>
            <UpdateVehicle />
          </PrivateRoute>
        ),

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