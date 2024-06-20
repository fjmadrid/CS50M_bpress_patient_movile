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
} from "../src/components/styled";

import { useSelector, useDispatch } from "react-redux";
import {
  selectPatientFetchStatus,
  selectPatientFetchError,
  selectPatientFirstName,
  selectPatientEmail,
  fetchPatient,
} from "../src/state/patientSlice";

import {
  fetchDoctor,
  selectDoctorFetchError,
  selectDoctorFetchStatus,
} from "../src/state/doctorSlice";

import {
  resetSessionState,
  selectSessionCredentials,
} from "../src/state/sessionSlice";

import { Pressable, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { router, Link } from "expo-router";

const { brand } = Colors;

export default function WelcomeScreen() {
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
    router.replace("/login");
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require("../assets/welcome.jpeg")}
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
                  <Link href="/home" asChild>
                    <Pressable>
                      <Avatar
                        resizeMode="cover"
                        source={require("../assets/avatar.jpg")}
                      />
                    </Pressable>
                  </Link>
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
