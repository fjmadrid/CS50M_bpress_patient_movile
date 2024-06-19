import { StatusBar } from "expo-status-bar";
import {
  InnerContainer,
  StyledFormArea,
  StyledButton,
  StyledButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
  PageSubtitle,
} from "../components/styled";

import { useSelector } from "react-redux";
import {
  selectPatientFirstName,
  selectPatientEmail,
} from "../state/patientSlice";

import { TouchableOpacity } from "react-native";

export function WelcomeScreen({ navigation }) {
  const patientFirstName = useSelector(selectPatientFirstName);
  const patientEmail = useSelector(selectPatientEmail);

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require("./../../assets/welcome.jpeg")}
        />
        <WelcomeContainer>
          <StyledFormArea>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Avatar
                resizeMode="cover"
                source={require("./../../assets/avatar.jpg")}
              />
            </TouchableOpacity>
            <PageSubtitle welcome={true}>{patientFirstName}</PageSubtitle>
            <PageSubtitle welcome={true}>{patientEmail}</PageSubtitle>
            <Line />
            <StyledButton
              onPress={() => {
                console.log("Logout !!");
                navigation.navigate("Login");
              }}
            >
              <StyledButtonText>Logout</StyledButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
}
