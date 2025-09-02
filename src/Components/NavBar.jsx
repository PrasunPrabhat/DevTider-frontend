import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/Constants";
import { removeUser } from "../utils/Store/userSlice";
import LogoIcon from "../assets/LOGO_icon.png";
import { fetchRequests } from "../utils/fetchRequests";

const NavBar = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests); // ✅ access requests from Redux
  const hamburgerRef = useRef(null); // 👈 new ref for hamburger

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown if click outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current.removeAttribute("open");
      }

      // Close hamburger dropdown if click outside
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        hamburgerRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    if (userData) {
      fetchRequests(dispatch);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout Handler
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout", // your logout API
        {},
        { withCredentials: true } // important to send cookies
      );

      // ✅ Clear Redux state
      dispatch(removeUser());

      // Show success toast
      toast.success("Logout Successful!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect after short delay
      setTimeout(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-neutral-900/80 backdrop-blur-lg text-white px-4 sm:px-6 md:px-10 py-3 shadow-lg sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left Section - Logo + Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <img
            src={LogoIcon}
            alt="DevTinder Logo"
            className="h-10 w-10 sm:h-10 sm:w-10 md:w-[4.5rem] object-contain ml-9 md:ml-[-1.5rem]"
          />
          <span className="text-xl sm:text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            DevTinder
          </span>
        </Link>

        {/* Middle Links (hidden on mobile) */}
        {userData && (
          <div className="hidden md:flex gap-8 text-lg font-medium">
            <Link
              to="/"
              className="hover:text-indigo-700 transition-colors duration-200 hover:bg-indigo-100 rounded-lg p-2"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="hover:text-indigo-700 transition-colors duration-200 hover:bg-indigo-100 rounded-lg p-2"
            >
              Profile
            </Link>
            <Link
              to="/connections"
              className="hover:text-indigo-700 transition-colors duration-200 hover:bg-indigo-100 rounded-lg p-2"
            >
              Connections
            </Link>
            {/* ✅ Requests with badge */}
            <Link
              to="/requests"
              className="relative hover:text-indigo-700 transition-colors hover:bg-indigo-100 rounded-lg p-2"
            >
              Requests
              {requests && requests.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {requests.length}
                </span>
              )}
            </Link>
            {/* ⭐ Premium Upgrade Button */}
            <Link
              to="/premium"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform"
            >
              ⭐ Go Premium
            </Link>
          </div>
        )}

        {/* Right Section */}
        {userData && (
          <div className="flex items-center gap-3">
            <p className="hidden sm:block text-gray-300">
              Hi,{" "}
              <span className="font-semibold text-white">
                {userData.firstName}
                {/* ✅ Show Premium Tick if user is premium */}
                {userData.isPreminum && (
                  <span className="text-yellow-400 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-semibold">Premium</span>
                  </span>
                )}
              </span>
            </p>

            {/* Avatar Dropdown */}
            <details ref={dropdownRef} className="dropdown dropdown-end">
              <summary
                className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
                role="button"
                aria-label="User menu"
              >
                <div className="w-10 h-10 rounded-full border-2 border-indigo-400 overflow-hidden shadow-md">
                  <img
                    src={
                      userData?.photoUrl || "https://via.placeholder.com/150"
                    }
                    alt="User profile"
                    className="object-cover w-full h-full"
                  />
                  {/* 🔹 Premium Badge on avatar */}
                  {userData.isPreminum && (
                    <span className="absolute bottom-0 right-0 bg-yellow-400 text-black rounded-full p-1 border border-white">
                      ⭐
                    </span>
                  )}
                </div>
              </summary>
              <ul
                className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-xl z-[1] mt-3 w-44 p-2 shadow-lg border border-gray-200"
                role="menu"
              >
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    My Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left hover:bg-red-100 text-red-600 rounded-lg px-2 py-1 transition-colors"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </details>

            {/* Mobile Hamburger Menu */}
            <details
              ref={hamburgerRef}
              className="dropdown dropdown-end md:hidden"
            >
              <summary className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </summary>
              <ul className="menu dropdown-content bg-white rounded-xl mt-3 w-44 p-2 shadow-lg text-gray-800 border border-gray-200">
                <li>
                  <Link to="/" className="hover:bg-indigo-100 rounded-lg">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-indigo-100 rounded-lg"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="hover:bg-indigo-100 rounded-lg"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="hover:text-indigo-400 transition-colors duration-200"
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  {/* ✅ Requests with badge */}
                  <Link
                    to="/requests"
                    className="relative hover:text-indigo-400 transition-colors"
                  >
                    Requests
                    {requests && requests.length > 0 && (
                      <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {requests.length}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  {/* ⭐ Premium Upgrade Button */}
                  <Link
                    to="/premium"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-transform"
                  >
                    ⭐ Go Premium
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </details>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
