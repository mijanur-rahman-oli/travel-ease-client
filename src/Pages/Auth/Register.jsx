import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Password must have at least one uppercase letter");
      toast.error("Password must have at least one uppercase letter");
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError("Password must have at least one lowercase letter");
      toast.error("Password must have at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setPasswordError("");
    toast.loading("Creating account...", { id: "register" });

    createUser(email, password)
      .then((result) => {
        return updateUserProfile(displayName, photoURL).then(() => result);
      })
      .then(() => {
        toast.success("Registration successful!", { id: "register" });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Registration failed!", { id: "register" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Signing in with Google...", { id: "google-reg" });
    signInWithGoogle()
      .then(() => {
        toast.success("Google signup successful!", { id: "google-reg" });
        navigate("/", { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Google signup failed!", { id: "google-reg" });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

          <form onSubmit={handleRegister}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                name="displayName"
                placeholder="Full Name"
                className="input input-bordered rounded-full"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Photo URL (optional)</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered rounded-full"
              />
            </div>

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
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter 6 Character Password"
                className="input input-bordered rounded-full pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-[65%] transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm mb-4">{passwordError}</div>
            )}

            <button className="btn w-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-500 text-white border-none hover:opacity-90">
              Register
            </button>
          </form>

          <div className="divider mb-2">OR</div>

          <button className="btn btn-outline w-full flex items-center gap-2"
            onClick={handleGoogleSignIn}>
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <p className="text-center mt-3 text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;