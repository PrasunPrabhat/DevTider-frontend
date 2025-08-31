import React, { useEffect, useState } from "react";
import LOGO from "../assets/LOGO_icon.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Heroicons
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/Store/userSlice";
import { BASE_URL } from "../utils/Constants";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // ✅ get user from Redux
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      // ✅ If already on some protected page, don’t force redirect to /feed
      if (window.location.pathname === "/login") {
        navigate("/feed");
      }
    }
  }, [user, navigate]);

  // Put data into the Redux Store
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(""); // clear old errors
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message); // backend msg
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // stop spinner after request
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 sm:px-6">
      {/* ✅ Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
        {/* Logo + Heading */}
        <div>
          <Link to="/">
            <img
              src={LOGO}
              alt="DevTinder Logo"
              className="mx-auto h-12 w-auto"
            />
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
            Login in to your account
          </h2>
        </div>

        {/* Form */}
        <form
          className="space-y-6"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={emailId}
                required
                autoComplete="email"
                onChange={(e) => setEmailId(e.target.value)}
                className="block w-full rounded-md bg-white/20 border border-white/30 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <div className="text-sm">Forgot password?</div>
            </div>

            <div className="mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/20 border border-white/30 px-3 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {/* Toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-400 text-sm font-medium text-center">
              {errorMessage}
            </p>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                "Log in"
              )}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-300">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
