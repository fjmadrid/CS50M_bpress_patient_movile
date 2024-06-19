import { StatusBar } from "expo-status-bar";
import {
  InnerContainer,
  StyledFormArea,
  StyledButton,
  StyledButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
  PageSubtitle,
  Colors,
  MsgBox,
} from "../components/styled";

import { useSelector, useDispatch } from "react-redux";
import {
  selectPatientFetchStatus,
  selectPatientFetchError,
  selectPatientFirstName,
  selectPatientEmail,
  fetchPatient,
} from "../state/patientSlice";

import {
  fetchDoctor,
  selectDoctorFetchError,
  selectDoctorFetchStatus,
} from "../state/doctorSlice";

import {
  resetSessionState,
  selectSessionCredentials,
} from "../state/sessionSlice";

import { TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect } from "react";

const { brand } = Colors;

export function WelcomeScreen({ navigation }) {
  const patientFetchStatus = useSelector(selectPatientFetchStatus);
  const patientFetchError = useSelector(selectPatientFetchError);
  const doctorFetchStatus = useSelector(selectDoctorFetchStatus);
  const doctorFetchError = useSelector(selectDoctorFetchError);
  const dispatch = useDispatch();
  const credentials = useSelector(selectSessionCredentials);
  const patientFirstName = useSelector(selectPatientFirstName);
  const patientEmail = useSelector(selectPatientEmail);

  useEffect(() => {
    if (patientFetchStatus === "idle") dispatch(fetchPatient(credentials));
    if (doctorFetchStatus === "idle") dispatch(fetchDoctor());
  }, [dispatch, credentials, patientFetchStatus, doctorFetchStatus]);

  console.log(
    "In welcome screen. ",
    `patientFetchStatus:${patientFetchStatus}`,
    ` doctorFetchStatus:${doctorFetchStatus}`
  );

  const handle_logout = () => {
    console.log("In welcome screen, logout!!");
    dispatch(resetSessionState());
    navigation.navigate("Login");
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require("./../../assets/welcome.jpeg")}
        />
        <WelcomeContainer>
          <StyledFormArea>
            {patientFetchStatus === "failed" && (
              <MsgBox>Error fetching patient data: {patientFetchError}</MsgBox>
            )}
            {doctorFetchStatus === "failed" && (
              <MsgBox>Error fetching doctor data: {doctorFetchError}</MsgBox>
            )}
            {patientFetchStatus === "succeeded" &&
              doctorFetchStatus === "succeeded" && (
                <>
                  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Avatar
                      resizeMode="cover"
                      source={require("./../../assets/avatar.jpg")}
                    />
                  </TouchableOpacity>
                  <PageSubtitle welcome={true}>{patientFirstName}</PageSubtitle>
                  <PageSubtitle welcome={true}>{patientEmail}</PageSubtitle>
                </>
              )}
            {(patientFetchStatus === "loading" ||
              doctorFetchStatus === "loading") && (
              <ActivityIndicator size="large" color={brand} />
            )}
            <Line />
            <StyledButton onPress={handle_logout}>
              <StyledButtonText>Logout</StyledButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
}
