import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      if (!Array.isArray(state)) return state;
      const newfeed = state.filter((user) => user._id !== action.payload);
        return newfeed;
    },
  },
});

export const { addFeed , removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
