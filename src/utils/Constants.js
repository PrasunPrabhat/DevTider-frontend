const isHTTPS = window.location.hostname !== "localhost";
export const BASE_URL = isHTTPS
  ? "https://devtinder-backend-dg8j.onrender.com" 
  : "http://localhost:3000";