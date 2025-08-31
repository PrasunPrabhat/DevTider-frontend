import React from "react";
import LogoIcon from "../assets/LOGO_icon.png"; // ✅ Use your logo
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-gray-300 py-[1rem] mt-10 border-t border-neutral-700">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section: Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src={LogoIcon}
            alt="DevTinder Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-lg font-semibold tracking-wide text-white">
            DevTinder
          </span>
        </div>

        {/* Middle Section: Links */}
        <div className="flex gap-6 text-sm">
          <Link to="/feed" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <Link
            to="/profile"
            className="hover:text-indigo-400 transition-colors"
          >
            Profile
          </Link>
        </div>

        {/* Right Section: Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} DevTinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
