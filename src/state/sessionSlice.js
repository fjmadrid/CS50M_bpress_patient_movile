import { createSlice } from "@reduxjs/toolkit";

export const initialSessionState = {
  token: "",
};

export const sessionSlice = createSlice({
  name: "patient",
  initialState: initialSessionState,
  reducers: {},
});

export const selectSessionToken = (state) => state.session.token;

export default sessionSlice.reducer;
