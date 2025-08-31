// ConnectionCard.jsx
import React from "react";

const ConnectionCard = ({ user }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform">
      {/* User Image */}
      <img
        src={user.photoUrl}
        alt={user.firstName}
        className="w-full h-full object-cover"
      />

      {/* User Info */}
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-xl font-bold text-white">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-sm text-indigo-300">{user.emailId}</p>

        <p className="text-gray-300 mt-2 text-sm">
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
      </div>
    </div>
  );
};

export default ConnectionCard;
