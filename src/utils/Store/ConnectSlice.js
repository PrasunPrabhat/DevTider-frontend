import { createSlice } from "@reduxjs/toolkit";

const ConnectSlice = createSlice({
  name: "Connections",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = ConnectSlice.actions;

export default ConnectSlice.reducer;
