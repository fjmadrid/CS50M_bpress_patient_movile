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
  PageTitle,
  PageSubtitle,
} from "../components/styled";

export function WelcomeScreen({ navigation }) {
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage
          resizeMode="cover"
          source={require("./../../assets/icon.png")}
        />
        <WelcomeContainer>
          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("./../../assets/icon.png")}
            />
            <PageSubtitle welcome={true}>pepe</PageSubtitle>
            <PageSubtitle welcome={true}>pepe@example.com</PageSubtitle>
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
