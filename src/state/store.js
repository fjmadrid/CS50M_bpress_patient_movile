import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patientSlice";
import doctorReducer from "./doctorSlice";
import sessionReducer from "./sessionSlice";
import measurementsReducer from "./measurementsSlice";
import messagesReducer from "./messagesSlice";

export default configureStore({
  reducer: {
    patient: patientReducer,
    doctor: doctorReducer,
    session: sessionReducer,
    measurements: measurementsReducer,
    messages: messagesReducer,
  },
});
