import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patientSlice";
import doctorReducer from "./doctorSlice";
import sessionReducer from "./sessionSlice";

export default configureStore({
  reducer: {
    patient: patientReducer,
    doctor: doctorReducer,
    session: sessionReducer,
  },
});
