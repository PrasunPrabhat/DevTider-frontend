import io from "socket.io-client";
import { BASE_URL } from "../utils/Constants";

export const createSocketConnection = () => {
  return io(BASE_URL, {
    withCredentials: true, // ✅ send cookies (JWT)
  });
};
