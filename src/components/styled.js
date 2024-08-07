import styled from "styled-components/native";

/* eslint-disable no-unused-vars */
import { View, Text, TextInput, Image, Pressable } from "react-native";
/* eslint-enable no-unused-vars */

import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

// Colors

export const Colors = {
  primary: "#ffffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6E282D",
  brandLight: "#C84952",
  green: "#10B981",
  red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 10}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const MessagesContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 90%;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const WelcomeImage = styled.Image`
  height: 40%;
  min-width: 100%;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
  ${({ wellcome }) =>
    wellcome &&
    `
    font-size: 35px;
  `}
`;

export const PageSubtitle = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${({ wellcome }) =>
    wellcome &&
    `
    margin-top: 5px;
    font-weight: normal;
  `}
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const MessageTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const StyledButton = styled.Pressable`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;

  ${({ google }) =>
    google &&
    `
    flex-direction: row;
    background-color: ${green};
    justify-content: center;
  `}
`;

export const StyledButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
  ${({ google }) =>
    google &&
    `    
    padding-left: 15px;
  `}
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.Pressable`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: ${tertiary};
`;

export const TextLink = styled.Pressable`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;
