import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  InnerContainer,
  StyledContainer,
  StyledButton,
  StyledButtonText,
  Line,
  MsgBox,
} from "../../../src/components/styled";

import { Colors } from "../../../src/components/styled";
import {
  selectMeasurementsStatus,
  selectMeasurementsError,
  fetchMeasurements,
  selectMeasurementById,
  selectMeasurementsIds,
} from "../../../src/state/measurementsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Pressable,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import Dayjs from "dayjs";

const { primary } = Colors;

const Measurement = ({ id, showDetail }) => {
  const item = useSelector((state) => selectMeasurementById(state, id));
  return (
    <Link
      href={{
        pathname: "/home/measurements/[id]",
        params: { id: id },
      }}
      asChild
    >
      <Pressable
        style={{
          width: "100%",
          marginTop: 10,
          padding: 10,
          backgroundColor: "lightgrey",
        }}
      >
        <View style={{ width: "100%" }}>
          <View style={{ width: 200 }}>
            <Text>{Dayjs(item.date).format("YYYY-MM-DD")}</Text>
          </View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text>{item.systolic}</Text>
            <Text>{item.diastolic}</Text>
            <Text>{item.ppm}</Text>
            <Text>{item.observation}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default function MeasuresScreen() {
  const measurementsStatus = useSelector(selectMeasurementsStatus);
  const measurementsError = useSelector(selectMeasurementsError);
  const measurementsIds = useSelector(selectMeasurementsIds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (measurementsIds.length === 0 && measurementsStatus === "idle") {
      console.log("Dispatching action to fetch measurements.");
      dispatch(fetchMeasurements());
    }
  }, [dispatch, measurementsIds, measurementsStatus]);

  console.log(
    `In measurements screen. Number of measurements is ${measurementsIds.length} Measurements status: ${measurementsStatus}`
  );

  let content = null;
  if (measurementsStatus === "loading")
    content = <ActivityIndicator size="large" />;
  else if (measurementsStatus === "failed")
    content = <MsgBox>{measurementsError}</MsgBox>;
  else {
    content = (
      <FlatList
        data={measurementsIds}
        renderItem={({ item }) => <Measurement id={item} />}
        keyExtractor={(item) => item}
      />
    );
  }

  return (
    <StyledContainer>
      <InnerContainer>
        <Link href="/home/measurements/add" asChild>
          <StyledButton>
            <StyledButtonText>
              <FontAwesome size={32} color={primary} name="plus" />
            </StyledButtonText>
          </StyledButton>
        </Link>
        <Line />
        {content}
      </InnerContainer>
    </StyledContainer>
  );
}
