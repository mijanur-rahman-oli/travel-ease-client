import React from "react";
import { Link, useRouteError } from "react-router";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import errorImg from "../../assets/error-404.png"

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar/>
      <div className="flex flex-col items-center justify-center flex-grow space-y-4 p-8">
        <h1 className="text-xl font-semibold">{error?.message || "Something went wrong!"}</h1>
        <img src={errorImg} alt="Error 404" className="w-64 h-64" />
        <h2 className="text-2xl font-semibold">Page not found!</h2>
        <p className="text-gray-600">The page you are looking for is not available.</p>
        <Link
          className="px-4 py-2 rounded bg-gradient-to-r from-purple-700 to-purple-400 text-white hover:opacity-90 transition"
          to="/"
        >
          Go back
        </Link>
      </div>
      <Footer/>
    </div>
  );
};

export default ErrorPage;