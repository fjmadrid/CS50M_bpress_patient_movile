import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { DetailsScreen } from "./src/screens/DetailsScreen";
import { Colors } from "./src/components/styled";
import { SignupScreen } from "./src/screens/SignupScreen";
import { Provider } from "react-redux";
import store from "./src/state/store";

const { brand, primary } = Colors;
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: brand,
            },
            headerTintColor: primary,
            headerTitleAlign: "center",
          }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
