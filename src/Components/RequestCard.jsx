// components/RequestCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/Constants";
import { addRequests, removeRequests } from "../utils/Store/RequestSlice";

const RequestCard = ({ request, requests }) => {
  const dispatch = useDispatch();

  const handleReview = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // Update Redux → remove this request from state
      const updatedRequests = requests.filter((req) => req._id !== requestId);
      if (updatedRequests.length > 0) {
        dispatch(addRequests(updatedRequests));
      } else {
        dispatch(removeRequests());
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update request");
    }
  };

  const sender = request.fromUserId;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-transform">
      <img
        src={sender.photoUrl}
        alt={sender.firstName}
        className="w-full h-full object-cover"
      />

      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-xl font-bold text-white">
          {sender.firstName} {sender.lastName}
        </h2>
        <p className="text-sm text-indigo-300">{sender.emailId}</p>
        <p className="text-gray-300 mt-2 text-sm">
          {sender.about || "No bio provided"}
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleReview("accepted", request._id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition"
          >
            Accept
          </button>
          <button
            onClick={() => handleReview("rejected", request._id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
