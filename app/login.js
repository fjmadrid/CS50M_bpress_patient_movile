import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
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
} from "../src/components/styled";

import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../src/components/KeyboardAvoidingWrapper";

import { useSelector, useDispatch } from "react-redux";
import {
  signIn,
  setSessionCredentials,
  selectSessionLoginStatus,
  selectSessionLoginError,
} from "../src/state/sessionSlice";

import { router, Link } from "expo-router";

const { darkLight, brand, primary } = Colors;

export default function LoginScreen() {
  const [hidePassword, setHidePassword] = useState(true);
  const loginStatus = useSelector(selectSessionLoginStatus);
  const loginError = useSelector(selectSessionLoginError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginStatus === "succeeded") {
      router.replace("/(home)");
    }
  }, [loginStatus]);

  console.log(`In login screen. Login status:${loginStatus}`);

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
                {loginStatus !== "loading" && (
                  <StyledButton onPress={handleSubmit}>
                    <StyledButtonText>Login</StyledButtonText>
                  </StyledButton>
                )}
                {loginStatus === "loading" && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                <Line />
                <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25} />
                  <StyledButtonText google={true}>
                    Sign in with Google
                  </StyledButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account yet?</ExtraText>
                  <Link replace href="/signup" asChild>
                    <TextLink>
                      <TextLinkContent>Sign up</TextLinkContent>
                    </TextLink>
                  </Link>
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
