import React, { useEffect, useState } from "react";
import { View, Pressable, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  Colors,
  StyledButton,
  StyledButtonText,
  MsgBox,
  LeftIcon,
} from "../../../src/components/styled";

import { FontAwesome6 } from "@expo/vector-icons";

import { addNewMeasurement } from "../../../src/state/measurementsSlice";

import { Formik } from "formik";

import KeyboardAvoidingWrapper from "../../../src/components/KeyboardAvoidingWrapper";

import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { api_addNewMeasurement } from "../../../src/api/api";

const { darkLight, brand } = Colors;

export default function AddNewMeasurementScreen() {
  const [addStatus, setAddStatus] = useState("idle");
  const [addError, setAddError] = useState("");
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (addStatus === "succeeded") router.back();
  }, [addStatus]);

  const handleAddNewMeasurement = async (values) => {
    if (addStatus !== "pending") {
      console.log(
        `In measurements slice, add new measurement: ${JSON.stringify(values)}.`
      );
      setAddStatus("pending");
      try {
        const resp = await api_addNewMeasurement(values);
        console.log(`Response ${JSON.stringify(resp)}`);
        const { status, statusText, data } = resp;
        if (status !== 201) {
          console.log(
            "Error adding new measurement. ",
            `Response ${status}: ${statusText}`
          );
          setAddError(`Response ${status}: ${statusText}`);
          setAddStatus("failed");
        } else {
          dispatch(addNewMeasurement(data));
          setAddStatus("succeeded");
        }
      } catch (err) {
        setAddStatus("failed");
        setAddError(err);
      }
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setShowTimePicker(false);
    setDate(currentDate);
  };

  const activateDatePicker = () => {
    setShowDatePicker(true);
  };

  const activateTimePicker = () => {
    setShowTimePicker(true);
  };

  console.log(
    "In add new measurement screen. ",
    `measurementAddStatus:${addStatus}`
  );

  return (
    <>
      {addStatus === "pending" ? <ActivityIndicator size="large" /> : null}
      {addStatus !== "pending" ? (
        <KeyboardAvoidingWrapper>
          <StyledContainer>
            <InnerContainer>
              {showDatePicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              ) : null}
              {showTimePicker ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              ) : null}
              <Formik
                initialValues={{
                  systolic: "",
                  diastolic: "",
                  ppm: "",
                  observation: "",
                  date: "",
                }}
                onSubmit={(values) => {
                  values.date = date.toISOString();
                  console.log(
                    `Added new measurement with values: ${JSON.stringify(
                      values
                    )}`
                  );
                  handleAddNewMeasurement(values);
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <StyledFormArea>
                    <MyTextInput
                      icon="chevron-up"
                      label="Systolic pressure"
                      placeholder="120"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("systolic")}
                      onBlur={handleBlur("systolic")}
                      value={values.systolic}
                      keyboardType="numeric"
                    />
                    <MyTextInput
                      icon="chevron-down"
                      label="Diastolic pressure"
                      placeholder="70"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("diastolic")}
                      onBlur={handleBlur("diastolic")}
                      value={values.diastolic}
                      keyboardType="numeric"
                    />
                    <MyTextInput
                      icon="heart-pulse"
                      label="Pulses per minute"
                      placeholder="70"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("ppm")}
                      onBlur={handleBlur("ppm")}
                      value={values.ppm}
                      keyboardType="numeric"
                    />
                    <MyTextInput
                      icon="calendar-days"
                      label="Date"
                      placeholder="YYYY - MM - DD"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("date")}
                      onBlur={handleBlur("date")}
                      value={date.toDateString()}
                      isDateTime={true}
                      editable={false}
                      activateDateTimePicker={activateDatePicker}
                    />
                    <MyTextInput
                      icon="clock"
                      label="Time"
                      placeholder="HH : MM"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("date")}
                      onBlur={handleBlur("date")}
                      value={date.toDateString()}
                      isTimeTime={true}
                      editable={false}
                      activateDateTimePicker={activateTimePicker}
                    />
                    <MyTextInput
                      icon="pencil"
                      label="Observation"
                      placeholder="Write down any observation here."
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("observation")}
                      onBlur={handleBlur("observation")}
                      value={values.observation}
                      multiline={true}
                      numberOfLines={5}
                      activateDateTimePicker={activateTimePicker}
                    />
                    {addError !== "" ? <MsgBox>{addError}</MsgBox> : null}
                    <StyledButton onPress={handleSubmit}>
                      <StyledButtonText>Add new measurement</StyledButtonText>
                    </StyledButton>
                  </StyledFormArea>
                )}
              </Formik>
            </InnerContainer>
          </StyledContainer>
        </KeyboardAvoidingWrapper>
      ) : null}
    </>
  );
}

const MyTextInput = ({
  icon,
  label,
  isDateTime,
  activateDateTimePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <FontAwesome6 name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDateTime ? <StyledTextInput {...props} /> : null}
      {isDateTime ? (
        <Pressable onPress={activateDateTimePicker}>
          <StyledTextInput {...props} />
        </Pressable>
      ) : null}
    </View>
  );
};
