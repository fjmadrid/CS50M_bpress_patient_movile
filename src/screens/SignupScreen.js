import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { DateTimePicker } from "@react-native-community/datetimepicker";

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
} from "../components/styled";

import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";

const { darkLight, brand, primary } = Colors;

import { Formik } from "formik";

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

export function SignupScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmedPassword, setHideConfirmedPassword] = useState(true);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  // Actual selected date of birth
  const [dob, setDob] = useState();
  const onChange = (event, selectDate) => {
    const currentDate = selectedDate || date;
    setShowDateTimePicker(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShowDateTimePicker(true);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          {showDateTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(date) => setDate(date)}
            />
          )}
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmedPassword: "",
              birthDate: "",
            }}
            onSubmit={(values) => {
              console.log(`login with values: ${JSON.stringify(values)}`);
              navigation.navigate("Welcome");
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
                  value={dob ? dob.toDateString() : ""}
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
                  <TextLink>
                    <TextLinkContent
                      onPress={() => navigation.navigate("Login")}
                    >
                      Sign in
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
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
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
