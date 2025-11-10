import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    toast.loading("Logging in...", { id: "login" });

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!", { id: "login" });
        form.reset();
        navigate(location.state?.from || "/", { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Login failed!", { id: "login" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Signing in with Google...", { id: "google" });
    signInWithGoogle()
      .then(() => {
        toast.success("Google login successful!", { id: "google" });
        navigate(location.state?.from || "/", { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Google login failed!", { id: "google" });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl border border-gray-200">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

          <form onSubmit={handleLogIn}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="input input-bordered rounded-full"
                required
              />
            </div>

            <div className="form-control mb-4 relative">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Pasword"
                className=" input rounded-full pr-12"
                required/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-[65%] transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>



            <div className="text-right mb-4">
              <Link to="/forgot-password" className="link link-hover text-sm">
                Forgot password?
              </Link>
            </div>

            <button className="btn w-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none hover:opacity-90">
              Login
            </button>
          </form>

          <div className="divider my-6">OR</div>
          <button className="btn btn-outline w-full flex items-center gap-2"
            onClick={handleGoogleSignIn}>
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <p className="text-center mt-6 text-sm">
            New here?{" "}
            <Link to="/auth/register" className="link link-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;