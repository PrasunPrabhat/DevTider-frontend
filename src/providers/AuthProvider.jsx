import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { addUser, removeUser } from "../utils/Store/userSlice";
import { ArrowPathIcon } from "@heroicons/react/24/outline"; // ✅ Spinner icon

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ track auth check

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        dispatch(removeUser());
        console.error(err);
      } finally {
        setLoading(false); // ✅ done checking
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <ArrowPathIcon className="h-10 w-10 text-white animate-spin" />
        <p className="ml-3 text-white text-lg">Checking...</p>
      </div>
    );
  }

  return children;
};

export default AuthProvider;
