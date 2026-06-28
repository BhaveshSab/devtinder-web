import { createSlice } from "@reduxjs/toolkit";
const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removerequest: (state, action) => {
        const newarray = state.filter((request) => request._id !== action.payload);
        return newarray;
    }
  },
});

export const { addRequests, removerequest } = requestSlice.actions;
export default requestSlice.reducer;
      