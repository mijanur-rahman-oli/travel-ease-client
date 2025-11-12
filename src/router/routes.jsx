import { createBrowserRouter } from "react-router";
import axios from "axios";
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
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          try {
            const response = await axios.get('http://localhost:3000/latest-vehicles');
            return response.data;
          } catch (error) {
            throw new Error('Failed to fetch latest vehicles');
          }
        }
      },
      {
        path: "/all-vehicles",
        element: <AllVehicles />,
        loader: async () => {
          try {
            const response = await axios.get('http://localhost:3000/vehicles');
            return response.data;
          } catch (error) {
            throw new Error('Failed to fetch vehicles');
          }
        }
      },
      {
        path: "/vehicle-details/:id",
        element: (
          <PrivateRoute>
            <VehicleDetails />
          </PrivateRoute>
        )
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