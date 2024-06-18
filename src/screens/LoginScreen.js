import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  LeftIcon,
  RightIcon,
  StyledButton,
  StyledButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../components/styled";

import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

import { useSelector, useDispatch } from "react-redux";
import {
  signIn,
  setSessionCredentials,
  selectSessionLoginStatus,
  selectSessionLoginError,
} from "../state/sessionSlice";
import {
  fetchPatient,
  selectPatientFetchStatus,
  selectPatientFetchError,
} from "../state/patientSlice";
import {
  fetchDoctor,
  selectDoctorFetchStatus,
  selectDoctorFetchError,
} from "../state/doctorSlice";

const { darkLight, brand, primary } = Colors;

export function LoginScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  // const [credentials, setCredentials] = useState({
  //   username: "",
  //   password: "",
  // });
  const loginStatus = useSelector(selectSessionLoginStatus);
  const loginError = useSelector(selectSessionLoginError);
  const patientFetchStatus = useSelector(selectPatientFetchStatus);
  const patientFetchError = useSelector(selectPatientFetchError);
  const doctorFetchStatus = useSelector(selectDoctorFetchStatus);
  const doctorFetchError = useSelector(selectDoctorFetchError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus === "succeeded") {
      if (patientFetchStatus === "idle" || doctorFetchStatus === "idle") {
        if (patientFetchStatus === "idle") {
          console.log("Dispatching action to fetch the patient data.");
          dispatch(fetchPatient());
        }
        // if (doctorFetchStatus === "idle") {
        //   console.log("Dispatching action to fetch the doctor data.");
        //   dispatch(fetchDoctor());
        // }
      } else if (
        patientFetchStatus === "succeeded" ||
        doctorFetchStatus === "succeeded"
      ) {
        navigation.navigate("Welcome");
      }
    }
  }, [
    dispatch,
    navigation,
    loginStatus,
    patientFetchStatus,
    doctorFetchStatus,
  ]);
  console.log("En login screen!");
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => {
              console.log(`login with values: ${JSON.stringify(values)}`);
              console.log(`login status is: ${loginStatus}`);
              if (loginStatus !== "loading") {
                dispatch(setSessionCredentials(values));
                dispatch(signIn(values));
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  icon="mail"
                  label="Username"
                  placeholder="andy"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                <MyTextInput
                  icon="lock"
                  label="Password"
                  placeholder="* * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {loginStatus === "failed" && <MsgBox>{loginError}</MsgBox>}
                {doctorFetchStatus === "failed" && (
                  <MsgBox>
                    Error fetching doctor data: {doctorFetchError}
                  </MsgBox>
                )}
                {patientFetchStatus === "failed" && (
                  <MsgBox>
                    Error fetching patient data:{patientFetchError}
                  </MsgBox>
                )}
                <StyledButton onPress={handleSubmit}>
                  <StyledButtonText>Login</StyledButtonText>
                </StyledButton>
                <Line />
                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <StyledButtonText google={true}>
                    Sign in with Google
                  </StyledButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account yet?</ExtraText>
                  <TextLink>
                    <TextLinkContent
                      onPress={() => {
                        navigation.navigate("Signup");
                      }}
                    >
                      Sign up
                    </TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}

const MyTextInput = ({
  icon,
  label,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};
