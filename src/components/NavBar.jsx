import { Link, NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaCar } from "react-icons/fa6";
import { MdDirectionsCar, MdAddBox, MdBookmarkBorder, MdMenu } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (!html.classList.contains("theme-transition")) {
      html.classList.add("theme-transition");
    }
  }, [theme]);

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);

const handleThemeToggle = (e) => {
  const newTheme = e.target.checked ? "dark" : "light";
  setTheme(newTheme);

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};


  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const publicLinks = [
    { to: "/", icon: <GoHomeFill />, label: "Home", end: true },
    { to: "/all-vehicles", icon: <MdDirectionsCar />, label: "All Vehicles" },
    { to: "/add-vehicles", icon: <MdAddBox />, label: "Add Vehicle" },
  ];

  const privateLinks = [
    { to: "/my-vehicles", icon: <FaCar />, label: "My Vehicles" },
    { to: "/my-bookings", icon: <MdBookmarkBorder />, label: "My Bookings" },
  ];

  const NavLinks = ({ isMobile = false }) => (
    <>
      {publicLinks.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${isActive
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                : "hover:bg-base-200"
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span className="font-medium">{link.label}</span>
          </NavLink>
        </li>
      ))}
      {user &&
        privateLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${isActive
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "hover:bg-base-200"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </NavLink>
          </li>
        ))}
    </>
  );

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-base-100/95 backdrop-blur-lg shadow-xl py-3"
          : "bg-base-100 shadow-md py-4"
        }`}
    >
      <div className="max-w-[1344px] mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between">

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative p-2.5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl group-hover:scale-110 transition-transform">
                <MdDirectionsCar className="text-white text-3xl" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                TravelEase
              </h1>
              <p className="text-xs text-base-content/60 font-medium">Your Journey Awaits</p>
            </div>
          </Link>


          <div className="hidden lg:flex items-center gap-2">
            <ul className="menu menu-horizontal gap-1">
              <NavLinks />
            </ul>
          </div>


          <div className="flex items-center gap-3">


            <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-base-200">
              <input
                type="checkbox"
                onChange={handleThemeToggle}
                checked={theme === "dark"}
                aria-label="Toggle theme"
              />
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </label>


            {user ? (
              <div className="flex items-center gap-3">

                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.displayName || "User"}
                >
                  <div className="w-10 rounded-full ring-2 ring-purple-600 ring-offset-base-100 ring-offset-2 hover:ring-pink-600 transition-all cursor-pointer">
                    <img
                      alt="User avatar"
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      referrerPolicy="no-referrer"
                      className="rounded-full"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="btn btn-sm btn-ghost text-error hover:bg-error hover:text-white rounded-full flex items-center gap-1 font-medium"
                >
                  <IoLogOut className="text-lg" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Link
                  to="/auth/login"
                  className="btn btn-sm btn-ghost rounded-full font-medium flex items-center gap-1"
                >
                  <IoLogIn className="text-lg" />
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none rounded-full font-medium shadow-lg hover:scale-105 transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            <div className="dropdown dropdown-end lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
                <MdMenu className="text-2xl" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 shadow-2xl bg-base-100 rounded-2xl w-72 mt-3 gap-2 border border-base-300"
              >
                <NavLinks isMobile={true} />

                {!user && (
                  <div className="mt-4 pt-4 border-t border-base-300 flex flex-col gap-2">
                    <Link to="/auth/login" className="btn btn-sm btn-ghost rounded-xl font-medium">
                      <IoLogIn className="text-lg" /> Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className="btn btn-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none rounded-xl font-medium"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;