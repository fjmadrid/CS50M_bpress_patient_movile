import { Colors } from "../../../src/components/styled";
import { Provider } from "react-redux";
import store from "../../../src/state/store";
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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="add" />
        <Stack.Screen name="details" />
      </Stack>
    </Provider>
  );
}
