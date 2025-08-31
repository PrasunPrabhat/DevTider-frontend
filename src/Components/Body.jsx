import React from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/Store/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      // ✅ Show toast if token missing/expired
      toast.error("Please log in.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      if (err.status === 401) {
        navigate("/"); // redirect to home/login page
      }

      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content">
      {/* Navbar */}
      <header className="sticky top-0 z-50 shadow-md">
        <NavBar />
      </header>

      {/* Main content */}
      <main className="flex-grow container">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Body;
