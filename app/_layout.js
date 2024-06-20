import { Colors } from "../src/components/styled";
import { Provider } from "react-redux";
import store from "../src/state/store";
import { Stack } from "expo-router";

const { brand, primary } = Colors;

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: brand,
          },
          headerTintColor: primary,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
        <Stack.Screen name="details" />
      </Stack>
    </Provider>
  );
}
