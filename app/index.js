import { useSelector } from "react-redux";
import { selectSessionToken } from "../src/state/sessionSlice";
import axios from "axios";
import { Redirect } from "expo-router";

export default function IndexScreen() {
  const token = useSelector(selectSessionToken);
  if (token !== "") {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  }
  console.log(`In Index screen!. session token:"${token}"`);

  return (
    <>
      {token === "" && <Redirect href="/login" />}
      {token !== "" && <Redirect href="/welcome" />}
    </>
  );
}
