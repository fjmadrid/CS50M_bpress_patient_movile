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

import {
  editMeasurement,
  selectMeasurementById,
} from "../../../src/state/measurementsSlice";

import { Formik } from "formik";

import KeyboardAvoidingWrapper from "../../../src/components/KeyboardAvoidingWrapper";

import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { api_editMeasurement } from "../../../src/api/api";

const { darkLight, brand } = Colors;

export default function DetailsMeasurementScreen() {
  const { id } = useLocalSearchParams();
  const measurementValues = useSelector((state) =>
    selectMeasurementById(state, id)
  );
  const [editStatus, setEditStatus] = useState("idle");
  const [editError, setEditError] = useState("");
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date(measurementValues.date));

  useEffect(() => {
    if (editStatus === "succeeded") router.back();
  }, [editStatus]);

  const handleEditMeasurement = async (values) => {
    if (editStatus !== "pending") {
      console.log(
        `In handleEditMeasurement, edit measurement: ${JSON.stringify(values)}.`
      );
      setEditStatus("pending");
      try {
        const resp = await api_editMeasurement(values);
        console.log(`Response ${JSON.stringify(resp)}`);
        const { status, statusText, data } = resp;
        if (status !== 200) {
          console.log(
            "Error adding new measurement. ",
            `Response ${status}: ${statusText}`
          );
          setEditError(`Response ${status}: ${statusText}`);
          setEditStatus("failed");
        } else {
          dispatch(editMeasurement(data));
          setEditStatus("succeeded");
        }
      } catch (err) {
        setEditStatus("failed");
        setEditError(err);
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
    "In measurement details screen. ",
    `measurementValues:${JSON.stringify(measurementValues)} `,
    `editStatus:${editStatus}`
  );

  return (
    <>
      {editStatus === "pending" ? <ActivityIndicator size="large" /> : null}
      {editStatus !== "pending" ? (
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
                initialValues={{ ...measurementValues }}
                onSubmit={(values) => {
                  if (editing) {
                    values.date = date.toISOString();
                    console.log(
                      `Saving edited measurement with values: ${JSON.stringify(
                        values
                      )}`
                    );
                    handleEditMeasurement(values);
                  } else {
                    setEditing((editing) => !editing);
                  }
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
                      editable={editing}
                    />
                    <MyTextInput
                      icon="chevron-up"
                      label="Diastolic pressure"
                      placeholder="70"
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("diastolic")}
                      onBlur={handleBlur("diastolic")}
                      value={values.diastolic}
                      keyboardType="numeric"
                      editable={editing}
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
                      editable={editing}
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
                      editable={editing}
                    />
                    {editError !== "" ? <MsgBox>{editError}</MsgBox> : null}
                    <StyledButton onPress={handleSubmit}>
                      {editing ? (
                        <StyledButtonText>Save modifications</StyledButtonText>
                      ) : null}
                      {!editing ? (
                        <StyledButtonText>Edit measurement</StyledButtonText>
                      ) : null}
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
