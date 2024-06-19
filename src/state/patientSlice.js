import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_fetchPatient } from "../api/api.js";
export const initialPatientState = {
  data: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: null,
    weight: null,
    height: null,
  },
  status: "idle",
  error: null,
};

export const fetchPatient = createAsyncThunk(
  "patient/fetch",
  async (credentials) => {
    //const credentials = useSelector(selectSessionCredentials);
    console.log(
      `In patient slice, fetching patient data using credentials: ${JSON.stringify(
        credentials
      )}`
    );
    const response = await api_fetchPatient(credentials);
    return response.data;
  }
);

export const patientSlice = createSlice({
  name: "patient",
  initialState: initialPatientState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPatient.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        console.log(
          `In patient slice, fulfilled fetch with payload:${JSON.stringify(
            action.payload
          )})`
        );
        state.status = "succeeded";
        state.data.id = action.payload["user"]["id"];
        state.data.firstName = action.payload["user"]["username"];
        state.data.email = `${action.payload["user"]["username"]}@example.com`;
        state.data.birthDate = action.payload["birthdate"];
        state.data.weight = action.payload["weight"];
        state.data.height = action.payload["height"];
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors.

export const selectPatientId = (state) => state.patient.data.id;
export const selectPatientFirstName = (state) => state.patient.data.firstName;
export const selectPatientLastName = (state) => state.patient.data.lastName;
export const selectPatientEmail = (state) => state.patient.data.email;
export const selectPatientBirthDate = (state) => state.patient.data.birthDate;
export const selectPatientWeight = (state) => state.patient.data.weight;
export const selectPatientHeight = (state) => state.patient.data.height;
export const selectPatientFetchStatus = (state) => state.patient.status;
export const selectPatientFetchError = (state) => state.patient.error;

export default patientSlice.reducer;
