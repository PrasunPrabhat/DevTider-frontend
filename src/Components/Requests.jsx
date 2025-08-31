// Requests.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/Constants";
import { addRequests, removeRequests } from "../utils/Store/RequestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const [loading, setLoading] = useState(true);

  // Fetch received requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });

        if (res.data.data && res.data.data.length > 0) {
          dispatch(addRequests(res.data.data));
        } else {
          dispatch(removeRequests());
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch requests");
        dispatch(removeRequests());
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-300 text-lg">
          You don’t have any pending requests 🎉
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((req) => (
        <RequestCard key={req._id} request={req} requests={requests} />
      ))}
    </div>
  );
};

export default Requests;
