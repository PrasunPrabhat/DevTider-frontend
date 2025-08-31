// Feed.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/Constants";
import { addFeed, removeFeed } from "../utils/Store/feedSlice";
import UserCard from "./UserCard";
import { fetchRequests } from "../utils/fetchRequests";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data.users));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch feed!");
        dispatch(removeFeed());
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
    fetchRequests(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-300 text-lg">No users found in your feed 👀</p>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {feed.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onRequestSent={(userId) => {
            // Remove the user from feed state
            const updatedFeed = feed.filter((u) => u._id !== userId);
            dispatch(addFeed(updatedFeed));
          }}
        />
      ))}
    </div>
  );
};

export default Feed;
