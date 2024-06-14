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
} from "../components/styled";

import { Octicons, Ionicons } from "@expo/vector-icons";

const { darkLight, brand } = Colors;

import { Formik } from "formik";

export function LoginScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <StyledContainer>
      <InnerContainer>
        <Formik
          initialValues={{ user: "", password: "" }}
          onSubmit={(values) => console.log(values)}
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
              <StyledButton>
                <StyledButtonText>Login</StyledButtonText>
              </StyledButton>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
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
