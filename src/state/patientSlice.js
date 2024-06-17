import { createSlice } from "@reduxjs/toolkit";

export const initialPatientState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  birthDate: null,
  weight: null,
  height: null,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState: initialPatientState,
  reducers: {},
});

// Selectors.

export const selectPatientId = (state) => state.patient.id;
export const selectPatientFirstName = (state) => state.patient.firstName;
export const selectPatientLastName = (state) => state.patient.lastName;
export const selectPatientEmail = (state) => state.patient.email;
export const selectPatientBirthDate = (state) => state.patient.birthDate;
export const selectPatientWeight = (state) => state.patient.weight;
export const selectPatientHeight = (state) => state.patient.height;

export default patientSlice.reducer;
