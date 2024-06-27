import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
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
} from "../../../src/components/styled";

import {
  addNewMeasurement,
  selectMeasurementsError,
  selectMeasurementsAddStatus,
} from "../../../src/state/measurementsSlice";

import { selectPatientId } from "../../../src/state/patientSlice";

import { Formik } from "formik";

import KeyboardAvoidingWrapper from "../../../src/components/KeyboardAvoidingWrapper";

import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

const { darkLight, brand } = Colors;

export default function AddNewMeasurementScreen() {
  const measurementsAddStatus = useSelector(selectMeasurementsAddStatus);
  const measurementsError = useSelector(selectMeasurementsError);
  const patientId = useSelector(selectPatientId);
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (measurementsAddStatus === "succeeded") router.back();
  }, [measurementsAddStatus]);

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
    `measurementAddStatus:${measurementsAddStatus}`
  );

  return (
    <>
      {measurementsAddStatus === "loading" && (
        <ActivityIndicator size="large" />
      )}
      {measurementsAddStatus !== "loading" && (
        <KeyboardAvoidingWrapper>
          <StyledContainer>
            <InnerContainer>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
              {showTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              )}
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
                  dispatch(addNewMeasurement({ id: patientId, data: values }));
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <StyledFormArea>
                    <MyTextInput
                      label="Systolic pressure"
                      placeholder="120"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("systolic")}
                      onBlur={handleBlur("systolic")}
                      value={values.systolic}
                      keyboardType="numeric"
                    />
                    <MyTextInput
                      label="Diastolic pressure"
                      placeholder="70"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("diastolic")}
                      onBlur={handleBlur("diastolic")}
                      value={values.diastolic}
                      keyboardType="numeric"
                    />
                    <MyTextInput
                      label="Pulses per minute"
                      placeholder="70"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("ppm")}
                      onBlur={handleBlur("ppm")}
                      value={values.ppm}
                      keyboardType="numeric"
                    />
                    <MyTextInput
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
                    <MsgBox>{measurementsError}</MsgBox>
                    <StyledButton onPress={handleSubmit}>
                      <StyledButtonText>Add new measurement</StyledButtonText>
                    </StyledButton>
                  </StyledFormArea>
                )}
              </Formik>
            </InnerContainer>
          </StyledContainer>
        </KeyboardAvoidingWrapper>
      )}
    </>
  );
}

const MyTextInput = ({
  label,
  isDateTime,
  activateDateTimePicker,
  ...props
}) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDateTime && <StyledTextInput {...props} />}
      {isDateTime && (
        <Pressable onPress={activateDateTimePicker}>
          <StyledTextInput {...props} />
        </Pressable>
      )}
    </View>
  );
};
