import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_fetchDoctor } from "../api/api";

export const initialDoctorState = {
  data: { id: "", firstName: "", lastName: "", email: "" },
  status: "idle",
  error: null,
};

export const fetchDoctor = createAsyncThunk("patient/fetch", async () => {
  const response = await api_fetchDoctor();
  return response.data;
});

export const doctorSlice = createSlice({
  name: "doctor",
  initialState: initialDoctorState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDoctor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.id = action.payload.data["id"];
        state.data.firstName = action.payload.data["fullname"];
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors.

export const selectDoctorId = (state) => state.doctor.data.id;
export const selectDoctorFirstName = (state) => state.doctor.data.firstName;
export const selectDoctorLastName = (state) => state.doctor.data.lastName;
export const selectDoctorEmail = (state) => state.doctor.data.email;
export const selectDoctorFetchStatus = (state) => state.doctor.status;
export const selectDoctorFetchError = (state) => state.doctor.error;

export default doctorSlice.reducer;
