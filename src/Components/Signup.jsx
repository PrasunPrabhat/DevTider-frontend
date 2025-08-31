import React, { useState } from "react";
import LOGO from "../assets/LOGO_icon.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "male",
    about: "",
    skills: [],
  });

  const navigate = useNavigate();

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo selection and preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (photo) data.append("photo", photo);

      const res = await axios.post(`${BASE_URL}/signup`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // ✅ Show toast with API message
      toast.success(res.data.message || "Signup Successful!");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Signup failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 sm:px-6">
      <div className="w-full max-w-[45rem] bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl m-12 border border-white/20 p-8 space-y-6">
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
            Create your account
          </h2>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Photo */}
          <div className="mt-3 flex flex-col items-center gap-3">
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="h-36 w-36 rounded-full object-cover border border-white/30 shadow-md"
              />
            ) : (
              <div className="h-36 w-36 rounded-full bg-white/20 border border-dashed border-white/30 flex items-center justify-center text-gray-400 text-xs shadow-inner">
                Upload Profile Image
              </div>
            )}
            <label className="cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          {/* Names */}
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              className="w-1/2 rounded-md bg-white/20 border border-white/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
              className="w-1/2 rounded-md bg-white/20 border border-white/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="emailId"
            placeholder="Email"
            required
            className="w-full rounded-md bg-white/20 border border-white/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full rounded-md bg-white/20 border border-white/30 px-3 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-2 right-3 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            min="16"
            max="100"
            required
            className="w-full rounded-md bg-white/20 border border-white/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          {/* Gender */}
          <div className="flex gap-4">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="flex items-center text-gray-200">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  className="mr-2"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          {/* About */}
          <textarea
            name="about"
            placeholder="About You"
            rows="3"
            className="w-full rounded-md bg-white/20 border border-white/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          ></textarea>

          {/* Skills */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            className="w-full rounded-md bg-white/20 border border-white/30 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
