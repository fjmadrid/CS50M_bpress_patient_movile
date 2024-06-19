import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { InnerContainer } from "../components/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectSessionToken } from "../state/sessionSlice";
import axios from "axios";

export function SplashScreen({ navigation }) {
  const token = useSelector(selectSessionToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token === "") {
      console.log(`Not valid token: "${token}"`);
      console.log("Navigate to Login screen");
      navigation.navigate("Login");
    } else {
      console.log(`Valid token: "${token}"`);
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      navigation.navigate("Welcome");
    }
  }, [dispatch, navigation, token]);

  console.log(`In splash screen!. session token:"${token}"`);

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer></InnerContainer>
    </>
  );
}
