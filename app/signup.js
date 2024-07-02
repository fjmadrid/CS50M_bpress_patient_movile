import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../src/components/styled";

import { Octicons, Ionicons } from "@expo/vector-icons";

import { Formik } from "formik";

import KeyboardAvoidingWrapper from "../src/components/KeyboardAvoidingWrapper";

import { router, Link } from "expo-router";

const { darkLight, brand } = Colors;

export default function SignupScreen() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmedPassword, setHideConfirmedPassword] = useState(true);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDateTimePicker(false);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShowDateTimePicker(true);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          {showDateTimePicker ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          ) : null}
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmedPassword: "",
              birthDate: "",
            }}
            onSubmit={(values) => {
              console.log(`Sign up with values: ${JSON.stringify(values)}`);
              router.replace("/");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  icon="person"
                  label="Full Name"
                  placeholder="Luke Skywalker"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  keyboardType="email-address"
                />
                <MyTextInput
                  icon="mail"
                  label="Email"
                  placeholder="luke@example.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("user")}
                  onBlur={handleBlur("user")}
                  value={values.user}
                  keyboardType="email-address"
                />
                <MyTextInput
                  icon="calendar"
                  label="Birth date"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("birthDate")}
                  onBlur={handleBlur("birthDate")}
                  value={date.toDateString()}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
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
                <MyTextInput
                  icon="lock"
                  label="Confirm password"
                  placeholder="* * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmedPassword")}
                  onBlur={handleBlur("confirmedPassword")}
                  value={values.confirmedPassword}
                  secureTextEntry={hideConfirmedPassword}
                  isPassword={true}
                  hidePassword={hideConfirmedPassword}
                  setHidePassword={setHideConfirmedPassword}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <StyledButtonText>Sing up</StyledButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Already have an account?</ExtraText>
                  <Link replace href="/login" asChild>
                    <TextLink>
                      <TextLinkContent>Sign in</TextLinkContent>
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
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate ? <StyledTextInput {...props} /> : null}
      {isDate ? (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      ) : null}
      {isPassword ? (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      ) : null}
    </View>
  );
};
