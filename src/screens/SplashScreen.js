import { useEffect } from "react";
import { ActivityIndicator } from "react-native-web";
import { StatusBar } from "expo-status-bar";
import { InnerContainer } from "../components/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectSessionToken } from "../state/sessionSlice";
import { fetchPatient, selectPatientFetchStatus } from "../state/patientSlice";
import { fetchDoctor, selectDoctorFetchStatus } from "../state/doctorSlice";
import axios from "axios";

export function SplashScreen({ navigation }) {
  const token = useSelector(selectSessionToken);
  const patientFetchStatus = useSelector(selectPatientFetchStatus);
  const doctorFetchStatus = useSelector(selectDoctorFetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token === "") {
      console.log(`Not valid token: "${token}"`);
      console.log("Navigate to Login screen");
      navigation.navigate("Login");
    } else {
      console.log(`Valid token: "${token}"`);
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      navigation.navigate("Welcome");
    }
  }, [dispatch, navigation, token, patientFetchStatus, doctorFetchStatus]);

  console.log("En splash screen!");

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        {(patientFetchStatus === "loading" ||
          doctorFetchStatus === "loading") && (
          <ActivityIndicator size="large" />
        )}
      </InnerContainer>
    </>
  );
}
