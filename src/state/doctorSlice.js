import { createSlice } from "@reduxjs/toolkit";

export const initialDoctorState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState: initialDoctorState,
  reducers: {},
});

// Selectors.

export const selectDoctorId = (state) => state.doctor.id;
export const selectDoctorFirstName = (state) => state.doctor.firstName;
export const selectDoctorLastName = (state) => state.doctor.lastName;
export const selectDoctorEmail = (state) => state.doctor.email;

export default doctorSlice.reducer;
