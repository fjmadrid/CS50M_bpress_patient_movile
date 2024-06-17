import React, { useState } from "react";
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

import { useSelector } from "react-redux";
import { selectSessionToken } from "../state/sessionSlice";

const { darkLight, brand, primary } = Colors;

export function LoginScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const token = useSelector(selectSessionToken);

  if (token !== "") {
    //Este código está mal, ya que no podemos navegar directamente a otra
    //screen si devolver nada ... ya lo arreglaremos.
    console.log(`Using session token "${token}"`);
    navigation.navigate("Welcome");
  } else {
    console.log("Not valid session token!");
    return (
      <KeyboardAvoidingWrapper>
        <StyledContainer>
          <InnerContainer>
            <Formik
              initialValues={{ user: "", password: "" }}
              onSubmit={(values) => {
                console.log(`login with values: ${JSON.stringify(values)}`);
                navigation.navigate("Welcome");
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <StyledFormArea>
                  <MyTextInput
                    icon="mail"
                    label="Username"
                    placeholder="andy"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange("user")}
                    onBlur={handleBlur("user")}
                    value={values.user}
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
                  <MsgBox>...</MsgBox>
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
