const isNgrok = window.location.hostname !== "localhost";
export const BASE_URL = isNgrok 
  ? "https://abcd1234.ngrok.io" 
  : "http://localhost:3000";