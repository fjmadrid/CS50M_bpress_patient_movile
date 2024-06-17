import { createSlice } from "@reduxjs/toolkit";

export const initialSessionState = {
  token: "",
};

export const sessionSlice = createSlice({
  name: "patient",
  initialState: initialSessionState,
  reducers: {},
});

export default sessionSlice.reducer;
