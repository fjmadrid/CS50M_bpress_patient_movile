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
import { TouchableOpacity } from "react-native-web";

export function WelcomeScreen({ navigation }) {
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
            <PageSubtitle welcome={true}>José Madrid</PageSubtitle>
            <PageSubtitle welcome={true}>
              fj.madrid.cuevas@gmail.com
            </PageSubtitle>
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
