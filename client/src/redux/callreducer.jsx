import { createSlice } from "@reduxjs/toolkit";

export const callActiveSlice = createSlice({
  name: "callActive",
    initialState: {
      callActive : false
  },
  reducers: {
    toggleCallActive: (state) => {
      return {callActive : !state.callActive};
    },
  },
});

export const { toggleCallActive } = callActiveSlice.actions;
export const callActive = (state) => state.callActive.callActive;

export default callActiveSlice.reducer;
