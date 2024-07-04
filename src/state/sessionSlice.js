import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_login } from "../api/api.js";
import axios from "axios";

export const initialSessionState = {
  data: { token: "", credentials: { username: "", password: "" } },
  status: "idle",
  error: null,
};

export const signIn = createAsyncThunk(
  "session/signIn",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log(
        `In action session/signIn, calling api_login with credentials: ${JSON.stringify(
          credentials
        )}`
      );
      const response = await api_login(credentials);
      console.log(
        "In actiion session/signIn, Response: ",
        JSON.stringify(response)
      );
      const { status, statusText, data } = response;
      if (status === 200) return data;
      else return rejectWithValue(statusText);
    } catch (error) {
      console.log(
        "In action session/signIn, caught exception. error: ",
        JSON.stringify(error)
      );
      return rejectWithValue(error?.message ? error.message : "network error.");
    }
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState: initialSessionState,
  reducers: {
    resetSessionState(state, action) {
      return initialSessionState;
    },
    setSessionToken(state, action) {
      state.data.token = action.payload;
    },
    setSessionCredentials(state, action) {
      state.data.credentials = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(
          `In action signIn success with response data: ${JSON.stringify(
            action.payload
          )}`
        );
        state.data.token = action.payload["key"];
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${state.data.token}`;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectSessionToken = (state) => state.session.data.token;
export const selectSessionCredentials = (state) =>
  state.session.data.credentials;
export const selectSessionLoginStatus = (state) => state.session.status;
export const selectSessionLoginError = (state) => state.session.error;

export const { resetSessionState, setSessionToken, setSessionCredentials } =
  sessionSlice.actions;

export default sessionSlice.reducer;
