import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { InnerContainer } from "../src/components/styled";
import { useSelector } from "react-redux";
import { selectSessionToken } from "../src/state/sessionSlice";
import axios from "axios";
import { router, Slot, useRootNavigationState } from "expo-router";

export default function SplashScreen() {
  const rootNavigationState = useRootNavigationState();
  const token = useSelector(selectSessionToken);

  useEffect(() => {
    if (token === "") {
      console.log(`Not valid token: "${token}"`);
      console.log("Navigate to Login screen");
      router.navigate("/login");
    } else {
      console.log(`Valid token: "${token}"`);
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      router.navigate("/welcome");
    }
  }, [token]);

  if (rootNavigationState?.key) {
    console.log("In splash screen!. root navigator does not initialized yet.");
    return null;
  }

  console.log(`In splash screen!. session token:"${token}"`);

  return (
    <Slot>
      <StatusBar style="light" />
      <InnerContainer></InnerContainer>
    </Slot>
  );
}
