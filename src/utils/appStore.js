import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Store/userSlice.js";
import feedReducer from "./Store/feedSlice.js";
import ConnectReducer from "./Store/ConnectSlice.js";
import RequestReducer from "./Store/RequestSlice.js";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: ConnectReducer,
    requests: RequestReducer,
  },
});

export default appStore;
