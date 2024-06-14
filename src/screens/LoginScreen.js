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

const { darkLight, brand, primary } = Colors;

import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../components/KeyboardAvodingview";

export function LoginScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <Formik
            initialValues={{ user: "", password: "" }}
            onSubmit={(values) => {
              console.log(`login with values: ${JSON.stringify(values)}`);
              navigation.navigate("Home");
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
                    <TextLinkContent>sign up</TextLinkContent>
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
