import { createSlice } from "@reduxjs/toolkit";

export const sharedProfileSlice = createSlice({
  name: "sharedProfile",
  initialState: {
    referralId: null,
  },
  reducers: {
    setSharedProfile: (state, action) => {
      state.referralId = action.payload;
    },
    clearSharedProfile: (state) => {
      state.referralId = null;
    },
  },
});

export const { setSharedProfile, clearSharedProfile } = sharedProfileSlice.actions;

export default sharedProfileSlice.reducer;

