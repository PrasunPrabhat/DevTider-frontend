import axios from "axios";
import { BASE_URL } from "./Constants";
import { addRequests, removeRequests } from "./Store/RequestSlice";

export const fetchRequests = async (dispatch) => {
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
    console.error("Failed to fetch requests:", error);
    dispatch(removeRequests());
  }
};
