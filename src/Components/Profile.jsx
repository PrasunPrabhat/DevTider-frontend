import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/Constants";
import { addUser } from "../utils/Store/userSlice";
import {
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        setUserData(res.data);
        setFormData(res.data);
        dispatch(addUser(res.data));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setFormData((prev) => ({
        ...prev,
        skills: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      console.log(data);

      ["firstName", "lastName", "about", "skills", "age", "gender"].forEach(
        (key) => {
          if (key === "skills" && Array.isArray(formData.skills)) {
            formData.skills.forEach((skill) => data.append("skills", skill));
          } else if (formData[key] !== undefined) {
            data.append(key, formData[key]);
          }
        }
      );

      if (photoFile) {
        data.append("photo", photoFile);
      }

      const res = await axios.patch(`${BASE_URL}/profile/edit`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(data);

      setUserData(res.data.data);
      dispatch(addUser(res.data.data));
      toast.success(res.data.message || "Profile updated!", {
        position: "top-center",
        autoClose: 2000, // optional, close after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setEditMode(false);
      setPhotoFile(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );

  return (
    <div className="flex flex-col items-center px-4 py-6 sm:px-6 lg:px-8 w-full min-h-screen">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-10">
        {/* Profile Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={
                user.photoUrl ||
                "https://res.cloudinary.com/dzwclh36q/image/upload/v1744715220/user_profiles/dlm4ufwwylpns9cx1sqs.png"
              }
              alt="Profile"
              className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 rounded-full border-4 border-indigo-400 object-cover shadow-md transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
            />
            <button
              onClick={() => setEditMode(true)}
              className="mt-5 flex items-center gap-2 px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg transition text-sm sm:text-base font-semibold shadow-md"
            >
              <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Edit Profile
            </button>
          </div>

          {/* Right Column - Details */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-indigo-400 text-xs font-bold uppercase mb-1">
                Name
              </label>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {user.firstName} {user.lastName}
              </h2>
            </div>

            {/* Email */}
            <div>
              <label className="block text-indigo-400 text-xs font-bold uppercase mb-1">
                Email
              </label>
              <p className="text-indigo-300 break-all">{user.emailId}</p>
            </div>

            {/* Age */}
            <div>
              <label className="block text-indigo-400 text-xs font-bold uppercase mb-1">
                Age
              </label>
              <p className="text-gray-300">{user.age || "Not Provided"}</p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-indigo-400 text-xs font-bold uppercase mb-1">
                Gender
              </label>
              <p className="text-gray-300">{user.gender || "Not Provided"}</p>
            </div>

            {/* About */}
            <div className="sm:col-span-2">
              <label className="block text-indigo-400 text-xs font-bold uppercase mb-1">
                About
              </label>
              <p className="text-gray-300 text-justify">
                {user.about || "No bio added"}
              </p>
            </div>

            {/* Skills */}
            <div className="sm:col-span-2">
              <label className="block text-indigo-400 text-xs font-bold uppercase mb-1">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skills?.length > 0 ? (
                  user.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-semibold text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 italic text-sm">
                    No skills listed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Popup Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4">
          <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-[53rem] border border-white/20 shadow-xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">
              Edit Profile
            </h2>

            {/* Upload Photo */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  photoFile
                    ? URL.createObjectURL(photoFile)
                    : user.photoUrl ||
                      "https://res.cloudinary.com/dzwclh36q/image/upload/v1744715220/user_profiles/dlm4ufwwylpns9cx1sqs.png"
                }
                alt="Preview"
                className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full border-2 border-indigo-400 object-cover mb-3"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="text-gray-200 text-xs sm:text-sm"
              />
            </div>

            {/* Editable Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", name: "firstName", type: "text" },
                { label: "Last Name", name: "lastName", type: "text" },
                { label: "Age", name: "age", type: "number" },
                {
                  label: "Gender",
                  name: "gender",
                  type: "select",
                  options: ["male", "female", "others"],
                },
                { label: "About", name: "about", type: "textarea" },
                { label: "Skills", name: "skills", type: "text" },
              ].map((field) => (
                <div key={field.name} className="col-span-1 sm:col-span-2">
                  <label className="text-gray-200 mb-1 block text-xs sm:text-sm">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/10 border border-gray-400/30 px-3 py-2 text-white text-sm"
                    >
                      <option value="" className="text-black">
                        Select Gender
                      </option>
                      {field.options.map((opt) => (
                        <option value={opt} key={opt} className="text-black">
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      placeholder={`Enter ${field.label}`}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      rows="8"
                      className="w-full rounded-lg bg-white/10 border border-gray-400/30 px-3 py-2 text-white text-sm"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={`Enter ${field.label}`}
                      value={
                        field.name === "skills"
                          ? formData.skills?.join(", ") || ""
                          : formData[field.name] || ""
                      }
                      onChange={handleChange}
                      className="w-full rounded-lg bg-white/10 border border-gray-400/30 px-3 py-2 text-white text-sm"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition text-sm"
              >
                <XMarkIcon className="h-4 w-4" /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg transition disabled:opacity-50 text-sm"
              >
                <CheckCircleIcon className="h-4 w-4" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
