import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/DevTinder_Landing_Page_new.png";
import LOGO from "../assets/DevTinder FinalLOGO.png";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (userData) {
      // ✅ Only redirect if they are on landing page
      if (window.location.pathname === "/") {
        navigate("/feed");
      }
    }
  }, [userData, navigate]);

  return (
    <div
      className="relative flex flex-col min-h-screen bg-cover md:bg-contain md:bg-top  bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Dark global overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col text-white">
        {/* Header */}
        <header className="w-full py-3 px-4 sm:px-6 sticky top-0 z-50 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-white">
              <img
                src={LOGO}
                alt="DevTinder"
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-16"
              />
            </Link>

            {/* Nav actions */}
            <nav className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <Link
                to="/login"
                className="btn btn-ghost btn-xs sm:btn-sm text-white hover:bg-white/20"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary btn-xs sm:btn-sm text-white font-medium"
              >
                Register
              </Link>
            </nav>
          </div>
        </header>

        {/* ✅ Hero Section */}
        <section className="flex-grow flex items-center justify-center min-h-[70vh] sm:min-h-[85vh] text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Find Your Perfect{" "}
              <span className="text-secondary">Dev Match</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl opacity-90 leading-relaxed drop-shadow">
              “Alone we can do so little, together we can do so much.” <br />
              At <span className="font-semibold text-primary">DevTinder</span>,
              we help developers meet, collaborate, and build the future — one
              line of code at a time.
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/login"
                className="px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-white 
               bg-primary border border-white/20
               shadow-md hover:shadow-xl hover:scale-105 
               transition duration-300 ease-in-out"
              >
                Get Started
              </Link>

              <a
                href="#features"
                className="px-5 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-white 
               border border-white/40 backdrop-blur-sm 
               hover:bg-white/20 hover:border-white/70 
               hover:scale-105 transition duration-300 ease-in-out"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* ✅ Features Section */}
        <section
          id="features"
          className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12">
            Why Developers Choose{" "}
            <span className="text-primary">DevTinder</span>
          </h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="p-6 sm:p-8 text-center bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                👩‍💻 Developer Network
              </h3>
              <p className="text-sm sm:text-base">
                Find like-minded devs to collaborate, share knowledge, or start
                new projects together.
              </p>
            </div>
            <div className="p-6 sm:p-8 text-center bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                🚀 Project Matching
              </h3>
              <p className="text-sm sm:text-base">
                Post projects and get matched with developers who share your
                skills and goals.
              </p>
            </div>
            <div className="p-6 sm:p-8 text-center bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-transform">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                🔒 Secure & Simple
              </h3>
              <p className="text-sm sm:text-base">
                Sign up securely, manage your profile, and enjoy a smooth user
                experience.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ CTA Section */}
        <section className="py-16 sm:py-20 text-center bg-black/50 backdrop-blur-md px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
              Ready to Find Your Coding Match?
            </h2>
            <p className="mb-4 sm:mb-6 text-base sm:text-lg opacity-90">
              Build, collaborate, and grow your projects with developers who
              inspire you.
            </p>
            <Link to="/signup" className="btn btn-accent btn-md sm:btn-lg">
              Join Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
