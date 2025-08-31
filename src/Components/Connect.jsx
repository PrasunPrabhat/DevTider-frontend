// Connect.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/Constants";
import { addConnections, removeConnections } from "../utils/Store/ConnectSlice";
import ConnectionCard from "./ConnectionCard";

const Connect = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });

        if (res.data.data && res.data.data.length > 0) {
          dispatch(addConnections(res.data.data));
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch connections");
        dispatch(removeConnections());
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-300 text-lg">
          You don’t have any connections yet 🤝
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {connections.map((user) => (
        <ConnectionCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Connect;
