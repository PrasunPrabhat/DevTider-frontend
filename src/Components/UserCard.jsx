// UserCard.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/Constants";
import { XCircleIcon, HeartIcon } from "@heroicons/react/24/solid";

const UserCard = ({ user, onRequestSent }) => {
  const [sending, setSending] = useState(false);

  const handleRequest = async (status) => {
    setSending(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message || `Request ${status} ✅`);
      // ✅ Notify parent to remove this card
      onRequestSent(user._id);
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform">
      {/* User Image */}
      <img
        src={user.photoUrl}
        alt={`${user.firstName}`}
        className="w-full h-full object-cover"
      />

      {/* User Info */}
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-xl font-bold text-white">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-indigo-300">{user.emailId}</p>

        <p className="text-gray-300 mt-2 text-sm md:text-justify text-justify">
          {user.about || "No bio provided"}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          {user.skills?.length > 0 ? (
            user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs italic">No skills</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4 gap-3">
          <button
            onClick={() => handleRequest("ignored")}
            disabled={sending}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-50"
          >
            <XCircleIcon className="h-5 w-5" /> Ignore
          </button>
          <button
            onClick={() => handleRequest("interested")}
            disabled={sending}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-50"
          >
            <HeartIcon className="h-5 w-5" /> Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
